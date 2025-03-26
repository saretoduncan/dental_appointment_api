import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccessLevelService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}
  async onModuleInit() {
    await this.seedAccessLevel();
  }
  private async seedAccessLevel() {
    const accessLevels = ['ADMIN', 'USER', 'MODERATOR'];
    for (const accessLevel of accessLevels) {
      const existingAccessLevel =
        await this.prismaService.accessLevel.findUnique({
          where: {
            access_level: accessLevel,
          },
        });
      if (!existingAccessLevel) {
        await this.prismaService.accessLevel.create({
          data: {
            access_level: accessLevel,
          },
        });
      }
    }
  }

  async createAccessLevel(level: string) {
    const upperLevel = level.toUpperCase();

    const getLevel = await this.prismaService.accessLevel.findUnique({
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

    const res = await this.prismaService.accessLevel.create({
      data: {
        access_level: upperLevel,
      },
    });
    return res;
  }
  async getAllAccessLevels() {
    const res = await this.prismaService.accessLevel.findMany();
    return res;
  }
  async findAccessLevelByLevel(level: string) {
    const res = await this.prismaService.accessLevel.findFirst({
      where: {
        access_level: level.toUpperCase(),
      },
    });
    if (!res)
      throw new HttpException(
        `The access level ${level} is not registered yet`,
        HttpStatus.NOT_FOUND,
      );

    return res;
  }
  async getAccessLevelById(level_id: string) {
    const res = await this.prismaService.accessLevel.findUnique({
      where: {
        id: level_id,
      },
    });
    if (!res)
      throw new HttpException(
        `The access level ${level_id} is not registered yet`,
        HttpStatus.NOT_FOUND,
      );
    return res;
  }
  async updateAccessLevelById(level_id: string, level: string) {
    const getLevel = await this.getAccessLevelById(level_id);
    const res = await this.prismaService.accessLevel.update({
      where: {
        id: getLevel.id,
      },
      data: {
        access_level: level.toUpperCase(),
      },
    });
    return res;
  }
  async revokeAllAccessLevelByLevel(level: string) {
    const getLevel = await this.findAccessLevelByLevel(level);
    return await this.prismaService.accessLevel.update({
      where: {
        id: getLevel.id,
      },
      data: {
        users: {
          set: [],
        },
      },
    });
  }

  async deleteAccessLevelById(level_id: string) {
    const access_level = await this.getAccessLevelById(level_id);
    await this.prismaService.accessLevel.update({
      where: {
        id: access_level.id,
      },
      data: {
        users: {
          set: [],
        },
      },
    });
    return await this.prismaService.accessLevel.delete({
      where: {
        id: access_level.id,
      },
    });
  }
}
