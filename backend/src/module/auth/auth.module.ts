import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { env } from 'src/config/env.config';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.email.host,
        port: env.email.port,
        auth: {
          user: env.email.user,
          pass: env.email.password,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UploadService],
})
export class UserModule {}
