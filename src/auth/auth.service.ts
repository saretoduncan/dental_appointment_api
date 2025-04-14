import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from 'src/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    username = username.trim();
    if (!username)
      throw new HttpException(
        'USERNAME field cannot be left empty',
        HttpStatus.BAD_REQUEST,
      );
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

    const { password: string, ...userWithoutPass } = user;
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.access_levels.map((level) => level.access_level),
    };
    const accessToken = await this.signJwtToken(
      payload.username,
      payload.sub,
      payload.roles,
      process.env.JWT_SECRET!!,
      process.env.JWT_EXPIRE_IN!!,
    );

    return { ...userWithoutPass, accessToken };
  }
  async login(user: UserResponseDto, res: Response) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.access_levels.map((level) => level.access_level),
    };

    const refreshToken = await this.signJwtToken(
      payload.username,
      payload.sub,
      payload.roles,
      process.env.REFRESH_JWT_SECRET!!,
      process.env.REFRESH_JWT_EXPIRE_IN!!,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 14 * 60 * 60 * 1000,
      path: '/',
    });
  }
  private async signJwtToken(
    username: string,
    id: string,
    roles: string[],
    secret: string,
    expireTime: string,
  ) {
    return await this.jwtService.signAsync(
      { username: username, sub: id, roles: roles },
      {
        expiresIn: expireTime,
        secret: secret,
      },
    );
  }
  async refreshToken(username: string, id: string, roles: string[]) {
    //sign token
    //return signed token
    const payload = {
      username: username,
      sub: id,
      roles: roles,
    };
    const accessToken = await this.signJwtToken(
      username,
      id,
      roles,
      process.env.JWT_SECRET!!,
      process.env.JWT_EXPIRE_IN!!,
    );
    return {
      accessToken,
    };
  }

  async logout(res: Response) {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 0,
      path: '/',
    });
    return;
  }
}
