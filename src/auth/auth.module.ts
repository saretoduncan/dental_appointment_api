import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { RefreshJwtStrategy } from 'src/strategy/refreshJwtStrategy.strategy';

@Module({
  imports:[PassportModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy,JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
