import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { AccessLevelModule } from './access_level/access_level.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccessLevelModule,
    UsersModule,
    AuthModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
