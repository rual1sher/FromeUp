import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import token from 'src/helpers/token';
import { ApiResponse } from 'src/helpers/apiRespons';
import { Verify } from './dto/verify';
import { login } from './dto/login';
import { IPayload } from 'src/helpers/type';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}

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

    await this.prisma.user.update({
      where: { id: newUser.id },
      data: { token: hashSync(refreshToken, 10) },
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

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: hashSync(refreshToken, 10) },
    });

    return new ApiResponse({ accessToken, refreshToken });
  }

  async me({ id }: IPayload) {
    const user = await this.prisma.user.findFirst({
      where: { id, status: true },
      omit: { password: true, token: true },
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

    const accessToken = token.generateAccessToken({ id: user.id });
    const refreshToken = token.generateRefreshToken({ id: user.id });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: hashSync(refreshToken, 10) },
    });

    return new ApiResponse({ accessToken, refreshToken });
  }

  async logout({ id }: IPayload) {
    const user = await this.prisma.user.findFirst({
      where: { id, status: true },
    });
    if (!user) throw new NotFoundException('user not found');

    await this.prisma.user.update({
      where: { id },
      data: { token: null },
    });

    return new ApiResponse('user logout');
  }
}
