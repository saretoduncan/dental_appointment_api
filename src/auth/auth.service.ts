import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from 'src/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService:JwtService,
    private readonly configService:ConfigService
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
        access_levels: true,
      },
    });
    if (!user) {
      throw new HttpException(
        'You are not registered with us',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return null;
    }
    const payload = {
      username:user.username,
      sub: user.id,
      roles: user.access_levels
    }
    const accessToken= this.jwtService.sign(payload)
    const { password: string, ...userWithoutPass } = user;
    return {...userWithoutPass, accessToken};
  }
  async logout() {}
}
