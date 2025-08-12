import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getJwtSecret } from 'src/Constants/constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getJwtSecret(),
    });
  }

  validate(payload: { sub: string; username: string; roles: string[] }) {
    if (!payload.sub || !payload.username || !payload.roles)
      throw new ForbiddenException('!Invalid token payload');
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
