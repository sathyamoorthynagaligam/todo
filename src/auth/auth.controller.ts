import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateCustomerDto } from 'src/database/customerDto';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService,) { }

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() user: CreateCustomerDto) {

    return this.authService.signUp(user);
  }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Body() user): Promise<any> {
    return this.authService.logIn(user);
  }
}