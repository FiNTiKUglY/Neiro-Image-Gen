import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { AuthGuard } from '../auth/auth.guard';
import {ApiBearerAuth, ApiSecurity, ApiTags} from "@nestjs/swagger";
import { AddImageDto } from './dto/add-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { writeFileSync } from 'fs';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() image: AddImageDto) {
    return this.imagesService.create(image);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id/like')
  changeLikeStatus(@Request() req, @Param('id') id: string) {
    return this.imagesService.changeLikeStatus(id, req.user.sub);
  }

  @Get()
  findAll() {
    writeFileSync(`hi.txt`, 'Hi');
    return this.imagesService.findAll();
  }

  @Get('/leaderboard')
  findBest() {
    return this.imagesService.findBest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() image: UpdateImageDto) {
    return this.imagesService.update(id, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
