import { Injectable, OnModuleInit } from '@nestjs/common';
import { AccessLevelService } from 'src/access_level/access_level.service';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly accessLevelService: AccessLevelService,
    private readonly prismaService: PrismaService,
  ) {

  }
   async onModuleInit() {
       await this.seedAccessLevel()
       await this.seedAdminUser()
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
  private async seedAdminUser() {
    const adminUser = await this.prismaService.user.findUnique({
      where: {
        username: 'admin',
      },
    });

    if (adminUser) return;
    const access_level =
      await this.accessLevelService.findAccessLevelByLevel('ADMIN');
    const hashPassword = await bcrypt.hash('@Secure.Pass@2025', 10);

    await this.prismaService.user.create({
      data: {
        username: 'admin',
        password: hashPassword,
        access_levels: {
          connect: { id: access_level.id },
        },
      },
    });
  }
}
