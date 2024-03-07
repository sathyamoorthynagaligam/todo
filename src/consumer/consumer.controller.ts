import { Body, Controller, Get, Post, Request, UseGuards, HttpCode, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';




@Controller('api/user')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService,
    private readonly authService: AuthService,) { }




  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  
  
}
