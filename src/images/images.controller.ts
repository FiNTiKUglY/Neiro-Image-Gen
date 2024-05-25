import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AddImageDto } from './dto/add-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
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
    return this.imagesService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('/leaderboard')
  findBest() {
    return this.imagesService.findBest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() image: UpdateImageDto) {
    return this.imagesService.update(id, image);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
