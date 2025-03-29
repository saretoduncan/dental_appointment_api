import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[PassportModule, JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{
      expiresIn:'15m',
    }
  })],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
