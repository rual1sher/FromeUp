import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { env } from 'src/config/env.config';

@Injectable()
export class UploadService {
  @Cron(CronExpression.EVERY_3_HOURS)
  fileTempRemove() {
    const tempFile = path.join('uploads', 'temp');
    if (!fs.existsSync(tempFile)) return;

    const files = fs.readdirSync(tempFile);

    for (const file of files) {
      const fullFileName = path.join(tempFile, file);
      const stat = fs.statSync(fullFileName);

      if (stat.isFile()) {
        fs.unlinkSync(fullFileName);
      }
    }

    Logger.log(`Temp files were removed ✅`, 'FILE');
  }

  handleUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file not found');
    }

    const fileUrl = env.apiUrl + file.path.replace(/\\/g, '/').toString();

    return {
      filename: file.filename,
      url: fileUrl,
    };
  }

  saveFile(url: string) {
    const fileName = url.split('/').at(-1);

    if (!fileName) throw new NotFoundException('Incorrect url');

    const temp = path.join('uploads', 'temp', fileName);
    const saved = path.join('uploads', 'saved', fileName);
    const savedDir = path.dirname(saved);

    if (!fs.existsSync(savedDir)) {
      fs.mkdirSync(savedDir, { recursive: true });
    }

    if (!fs.existsSync(temp))
      throw new NotFoundException('File temp not found');

    fs.renameSync(temp, saved);
    return env.apiUrl + saved.replace(/\\/g, '/').toString();
  }

  removeFile(url: string) {
    const fileName = url?.split('/').at(-1);

    if (!fileName) return;

    const temp = path.join('uploads', 'temp', fileName);
    const saved = path.join('uploads', 'saved', fileName);
    const tempDir = path.dirname(temp);

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    if (fs.existsSync(saved)) {
      fs.renameSync(saved, temp);
    }
  }
}
