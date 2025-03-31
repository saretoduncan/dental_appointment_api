import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { UserResponseDto } from 'src/dto/users.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from 'src/guards/refreshTokenGuardguard';
import { JwtGuard } from 'src/guards/jwt.guard';

interface RequstWithUser extends Request {
  user: UserResponseDto;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req: RequstWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    await this.authService.login(user, res);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  @UseGuards(RefreshJwtGuard)
  async refreshToken(
    @Request()
    req: RequstWithUser,
  ) {
    console.log(req.user);
    return this.authService.refreshToken(
      req.user.username,
      req.user.id,
      req.user.access_levels.map((level) => level.access_level),
    );
  }
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(JwtGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
