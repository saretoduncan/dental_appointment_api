import { Global, Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Global()
@Module({
  controllers: [PatientController],
  providers: [PatientService],
  exports:[PatientService]
})
export class PatientModule {}
