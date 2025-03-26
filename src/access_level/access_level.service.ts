import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccessLevelService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccessLevel(level: string) {
    const upperLevel = level.toUpperCase();
    const getLevel = await this.prismaService.accessLevel.findFirst({
      where: {
        access_level: upperLevel,
      },
    });
    if (getLevel) {
      throw new HttpException(
        'The access level is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const res = await this.prismaService.accessLevel.create({
        data: {
          access_level: upperLevel,
        },
      });
      return res;
    } catch (e) {
        throw new HttpException("something went wrong while saving access level", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
