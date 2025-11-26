import { IsString } from 'class-validator';

export class login {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
