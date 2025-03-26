import { Global, Module } from '@nestjs/common';


import { PrismaService } from './prisma.service';
import { AccessLevelModule } from './access_level/access_level.module';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [AccessLevelModule, UsersModule],
  providers: [PrismaService],
  exports: [PrismaService
  ],
})
export class AppModule {}
