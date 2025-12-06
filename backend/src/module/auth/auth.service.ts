import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import token from 'src/helpers/token';
import { ApiResponse } from 'src/helpers/apiRespons';
import { Verify } from './dto/verify';
import { login } from './dto/login';
import { IPayload } from 'src/helpers/type';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/helpers/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(createUserDto: CreateAuthDto) {
    const { password, ...data } = createUserDto;

    const user = await this.prisma.user.findFirst({
      where: { name: createUserDto.name, status: true },
    });
    if (user) throw new NotFoundException('user exists');

    const newUser = await this.prisma.user.create({
      data: { ...data, password: hashSync(password, 10) },
    });

    const accessToken = token.generateAccessToken({ id: newUser.id });
    const refreshToken = token.generateRefreshToken({ id: newUser.id });

    await this.prisma.tokens.create({
      data: { token: refreshToken, userId: newUser.id },
    });

    return new ApiResponse({ accessToken, refreshToken });
  }

  async login({ password, name }: login) {
    const user = await this.prisma.user.findFirst({
      where: { name, status: true },
    });
    if (!user) throw new NotFoundException('user not found');

    const checkPassword = compareSync(password, user.password);
    if (!checkPassword) throw new BadRequestException('password is wrong');

    const accessToken = token.generateAccessToken({ id: user.id });
    const refreshToken = token.generateRefreshToken({ id: user.id });

    await this.prisma.tokens.create({
      data: { token: refreshToken, userId: user.id },
    });

    return new ApiResponse({ accessToken, refreshToken });
  }

  async me({ id }: IPayload) {
    const user = await this.prisma.user.findFirst({
      where: { id, status: true },
      omit: { password: true },
    });

    if (!user) throw new NotFoundException('user not found');

    return new ApiResponse(user);
  }

  async refresh({ token: refresh }: Verify) {
    const { id } = token.verifyRefreshToken(refresh);

    const user = await this.prisma.user.findFirst({
      where: { id, status: true },
    });
    if (!user) throw new NotFoundException('user not found');

    const checkRefresh = await this.prisma.tokens.findFirst({
      where: { token: refresh, userId: id },
    });
    if (!checkRefresh) throw new BadRequestException('token involid');

    const accessToken = token.generateAccessToken({ id: user.id });
    const refreshToken = token.generateRefreshToken({ id: user.id });

    await this.prisma.tokens.update({
      where: { id: checkRefresh.id },
      data: { token: refreshToken },
    });

    return new ApiResponse({ accessToken, refreshToken });
  }

  async logout({ id }: IPayload, token: string) {
    const checkToken = await this.prisma.tokens.findFirst({
      where: { userId: id, token },
    });
    if (!checkToken) throw new NotFoundException('user not found');

    await this.prisma.tokens.delete({ where: { id: checkToken.id } });

    return new ApiResponse('logout');
  }

  async logoutAll({ id }: IPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id, status: true },
      include: { Tokens: true },
    });

    if (!user.Tokens?.[0]) throw new NotFoundException('user token not found');

    await this.prisma.tokens.deleteMany({
      where: { id: { in: user.Tokens.map((el) => el.id) } },
    });
    return new ApiResponse('logout all');
  }
}
