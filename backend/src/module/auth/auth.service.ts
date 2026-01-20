import {
  BadRequestException,
  Inject,
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
import { UpdateDto } from './dto/update.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { mailerHtml } from './verify.message';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async signup(createUserDto: CreateAuthDto) {
    const { password, ...data } = createUserDto;

    const checkNickname = await this.prisma.user.findFirst({
      where: {
        AND: [
          { nickname: createUserDto.nickname },
          { email: createUserDto.email },
        ],
        status: true,
      },
    });

    if (checkNickname) {
      throw new BadRequestException('nickname and email exists');
    }

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

  async login({ password, login }: login) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: login }, { nickname: login }], status: true },
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
      include: { tokens: true },
    });

    if (!user.tokens.length) {
      throw new NotFoundException('user token not found');
    }

    await this.prisma.tokens.deleteMany({
      where: { id: { in: user.tokens.map((el) => el.id) } },
    });
    return new ApiResponse('logout all');
  }

  async update(dto: UpdateDto, id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id, status: true },
    });
    if (!user) throw new NotFoundException('user not found');

    if (dto.nickname && dto.nickname !== user.nickname) {
      const checkNickname = await this.prisma.user.findFirst({
        where: { nickname: dto.nickname },
      });
      if (checkNickname) throw new BadRequestException('nickname exists');
    }

    const data = await this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });

    return new ApiResponse(data);
  }

  async verifyMessage({ id }: IPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id, status: true },
    });

    if (!user && user.isVerify) {
      throw new NotFoundException('user not found or verify');
    }

    const verifyCode = Math.floor(Math.random() * 9000) + 1000;

    await this.cache.set(`e.${user.email}`, verifyCode);

    this.mailer.sendMail({
      from: '"FromeUp" <kr4054658@gmail.com>',
      to: user.email,
      subject: 'Подтверждение email в FromeUp',
      html: mailerHtml(user.nickname, verifyCode.toString()),
    });

    return new ApiResponse('send message to email');
  }

  async verifyAprove(code: string, { id }: IPayload) {
    if (!code.length) return new BadRequestException('code is empty');

    const user = await this.prisma.user.findUnique({
      where: { id, status: true },
    });

    if (!user && user.isVerify) {
      throw new NotFoundException('user not found or verify');
    }

    const cechCode = await this.cache.get(`e.${user.email}`);

    if (cechCode !== +code) {
      throw new BadRequestException('code is wrong');
    }

    await this.prisma.user.update({ where: { id }, data: { isVerify: true } });

    return new ApiResponse('verify aprove');
  }
}
