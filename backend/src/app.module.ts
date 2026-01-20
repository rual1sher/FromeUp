import { Module } from '@nestjs/common';
import { UserModule } from './module/auth/auth.module';
import { UploadModule } from './module/upload/upload.module';
import { PrismaModule } from './helpers/prisma/prisma.module';
import { GroupModule } from './module/group/group.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({ ttl: 1000 * 60 * 5, isGlobal: true }),
    UserModule,
    UploadModule,
    GroupModule,
    PrismaModule,
  ],
})
export class AppModule {}
