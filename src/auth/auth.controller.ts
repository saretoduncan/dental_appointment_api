import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { UserResponseDto } from 'src/dto/users.dto';

interface RequstWithUser extends  Request{
  user:UserResponseDto
}
@Controller('auth')
export class AuthController {
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req:RequstWithUser) {
    return req.user;
  }
}
