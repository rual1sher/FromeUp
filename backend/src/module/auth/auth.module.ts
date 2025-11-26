import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaClient],
})
export class UserModule {}
