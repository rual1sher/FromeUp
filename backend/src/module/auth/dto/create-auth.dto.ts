import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @MinLength(4)
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
