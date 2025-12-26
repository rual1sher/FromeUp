import { IsString } from 'class-validator';

export class login {
  @IsString()
  nickname: string;

  @IsString()
  password: string;
}
