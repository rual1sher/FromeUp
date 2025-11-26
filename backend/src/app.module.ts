import { Module } from '@nestjs/common';
import { UserModule } from './module/auth/auth.module';
import { UploadModule } from './module/upload/upload.module';

@Module({
  imports: [UserModule, UploadModule],
})
export class AppModule {}
