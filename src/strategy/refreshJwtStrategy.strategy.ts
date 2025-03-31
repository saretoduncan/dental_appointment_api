import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayloadDto } from 'src/dto/jwt.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refreshJwt',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.refreshToken,
      ]),
      secretOrKey: process.env.REFRESH_JWT_SECRET!!,
    });
  }
  async validate(payload: JwtPayloadDto) {
    console.log(payload);
    const user = await this.userService.getUserById(payload.sub);
    return user;
  }
}
