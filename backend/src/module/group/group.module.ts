import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, UploadService],
})
export class GroupModule {}
