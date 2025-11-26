import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { Verify } from './dto/verify';
import { login } from './dto/login';
import { AuthGuard } from 'src/helpers/authGuard';
import { IPayload } from 'src/helpers/type';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('signup')
  signin(@Body() createUserDto: CreateAuthDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('login')
  login(@Body() body: login) {
    return this.userService.login(body);
  }

  @Post('refresh')
  refresh(@Body() body: Verify) {
    return this.userService.refresh(body);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: IPayload) {
    return this.userService.logout(req);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: IPayload) {
    return this.userService.me(req);
  }
}
