import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('api-key'))
  @ApiHeader({
    name: 'X-API-KEY',
  })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.id);
  }
}
