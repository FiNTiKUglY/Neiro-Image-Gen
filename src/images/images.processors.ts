import { OnQueueCompleted, OnQueueDrained, OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Processor('generate-image')
export class ImageProcessor {
  private readonly logger = new Logger(ImageProcessor.name);
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  @Process('get-image')
  async getImage(job: Job): Promise<void> {
    const res = await axios.get('https://api.api-ninjas.com/v1/randomimage?category=nature', 
        { headers: 
          {
            'X-Api-Key' : '9YTmpLgKAYIrCZz/Jn3qRw==zwuhiEhCjiU9eOWc',
            'Accept' : 'image/jpg'
          }, 
          responseType: 'arraybuffer',
    });
    const folderName = join(__dirname, "..", "..", "..", "public");
    Buffer.from(res.data, 'binary').toString('base64');
    await writeFileSync(join(folderName, `${job.data.imageId}.jpg`), res.data, 'base64');
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.imagesRepository.update(job.data.imageId, {status: "done"})
  }

  @OnQueueError()
  onError(job: Job) {
    this.imagesRepository.update(job.data.imageId, {status: "error"})
  }
}