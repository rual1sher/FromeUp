import { Module } from '@nestjs/common';
import { UserModule } from './module/auth/auth.module';
import { UploadModule } from './module/upload/upload.module';
import { PrismaModule } from './helpers/prisma/prisma.module';
import { GroupModule } from './module/group/group.module';

@Module({
  imports: [UserModule, UploadModule, GroupModule, PrismaModule],
})
export class AppModule {}
