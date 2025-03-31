import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessLevelResDto, UserResponseDto } from 'src/dto/users.dto';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireAccessLevel = this.reflector.getAllAndOverride<string[]>(
      'accessLevels',
      [context.getHandler(), context.getClass()],
    );
    if (!requireAccessLevel) return true;
    const { user } = context.switchToHttp().getRequest();

    return requireAccessLevel.some((role) => {
      return user?.roles.includes(role);
    });
  }
}
