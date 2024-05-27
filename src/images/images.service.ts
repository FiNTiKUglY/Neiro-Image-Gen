import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { UsersService } from '../users/users.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { AddImageDto } from './dto/add-image.dto';
import { randomUUID } from 'crypto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    private usersService: UsersService,

    @InjectQueue('generate-image') 
    private imageQueue: Queue
  ) {}

  @Interval(30000)
  async generate() {
    let image = {id: randomUUID(), name: "random" };
    await this.imagesRepository.save(image);
    this.imageQueue.add('get-image', { imageId: image.id }, { delay: 30000 });
  }

  async create(addImageDto: AddImageDto) {
    let image = {id: randomUUID(), name: addImageDto.name}
    return await this.imagesRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imagesRepository.find({
      relations: ['likedUsers'],
    });
  }

  async findBest(): Promise<Image[]> {
    let images = await this.imagesRepository.find({
      relations: ['likedUsers'],
    });
    images.sort((a, b) => {
      if (a.likedUsers.length > b.likedUsers.length)
        return -1;
      else if (a.likedUsers.length < b.likedUsers.length)
        return 1;
      return 0;
    });
    return images;
  }

  async changeLikeStatus(imageId: string, userId: string): Promise<Image | null> {
    let image = await this.imagesRepository.findOne({
      where: { id: imageId },
      relations: ['likedUsers'],
    });
    let user = await this.usersService.findOne(userId);
    if (image == null) {
      throw new NotFoundException();
    }
    if (user == null) {
        throw new NotFoundException();
    }
    if (image.likedUsers.filter(user => user.id == userId).length == 1) {
      let newList = user.likedImages.filter(image => image.id != imageId);
      user.likedImages = [...newList];
      await user.save();
    }
    else {
      user.likedImages = [...user.likedImages, image];
      await user.save();
    }
    return await this.imagesRepository.findOne({
      where: { id: imageId },
      relations: ['likedUsers'],
    });
  }

  findOne(id: string): Promise<Image | null> {
    return this.imagesRepository.findOne({
      where: { id: id },
      relations: ['likedUsers'],
    });
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    return await this.imagesRepository.update(id, updateImageDto);
  }

  async remove(id: string): Promise<void> {
    await this.imagesRepository.delete(id);
  }
}
