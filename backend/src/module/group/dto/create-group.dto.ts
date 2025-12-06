import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  nickname: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  banner?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  members: number[];
}
