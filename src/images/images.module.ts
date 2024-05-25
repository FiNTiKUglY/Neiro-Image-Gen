import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { UsersModule } from '../users/users.module';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { ImageProcessor } from './images.processors';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]), 
    UsersModule,
    BullModule.registerQueue({
      name: 'generate-image',
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '/public'),
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImageProcessor],
})
export class ImagesModule {}
