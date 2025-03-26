import { Global, Module } from '@nestjs/common';


import { PrismaService } from './prisma.service';
import { AccessLevelModule } from './access_level/access_level.module';

@Global()
@Module({
  imports: [AccessLevelModule],
  providers: [PrismaService],
  exports: [PrismaService
  ],
})
export class AppModule {}
