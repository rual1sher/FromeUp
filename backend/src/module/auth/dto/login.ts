import { IsString, MinLength } from 'class-validator';

export class login {
  @IsString()
  @MinLength(4)
  login: string;

  @IsString()
  password: string;
}
