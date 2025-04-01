import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { AccessLevelModule } from './access_level/access_level.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './patient/patient.module';
import { AppointmentsController } from './appointments/appointments.controller';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentsService } from './appointments/appointments.service';
import { AppointmentsController } from './appointments/appointments.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccessLevelModule,
    UsersModule,
    AuthModule,
    PatientModule,
    AppointmentsModule,
  ],
  providers: [PrismaService, AppointmentsService],
  exports: [PrismaService],
  controllers: [AppointmentsController],
})
export class AppModule {}
