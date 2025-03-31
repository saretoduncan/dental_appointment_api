import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  CreateDependentPatientDto,
  CreatePatientDto,
  UpdateDependentPatientDto,
  UpdatePatientDto,
} from 'src/dto/patients.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  //add patients
  @Post('new')
  async createPatientDto(@Body() patientInfo: CreatePatientDto) {
    return await this.patientService.addNewPatient(patientInfo);
  }

  //add dependentPatients
  @Post('new/dependent')
  async addDependent(
    @Query('primaryCaregiverId') primaryCaregiverId: string,
    @Body() dependentInfo: CreateDependentPatientDto,
  ) {
    if (!primaryCaregiverId?.trim()) {
      throw new HttpException(
        'PRIMARY CARERGIVER/GUARDIAN ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.table(dependentInfo);
    return await this.patientService.addDependent(
      primaryCaregiverId.trim(),
      dependentInfo,
    );
  }

  //get all patients
  @Get('all')
  async getAllPatients() {
    return this.patientService.getAllPatients();
  }

  //get patient by id
  @Get('id')
  async getPatientById(@Query('patientId') patientId: string) {
    if (!patientId.trim()) {
      throw new HttpException(
        'PATIENT ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.patientService.getPatientById(patientId);
  }

  //get dependent patient by id
  @Get('dependent')
  async getDependentPatientId(@Query('dependentId') dependentId: string) {
    if (!dependentId) {
      throw new HttpException(
        'DEPENDENT PATIENT ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.patientService.getDependentPatientById(dependentId);
  }

  //update patient
  @Patch('update/patient')
  async updatePatientById(
    @Query('patientId') patientId: string,
    @Body() updatePatientInfo: UpdatePatientDto,
  ) {
    if (!patientId.trim()) {
      throw new HttpException(
        'PATIENT ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.patientService.updatePatient(
      patientId,
      updatePatientInfo,
    );
  }

  //update dependent patient
  @Patch('update/dependentPatient')
  async updateDependentPatient(
    @Query('dependentId') dependentId: string,
    @Body() updateDependentInfo: UpdateDependentPatientDto,
  ) {
    if (!dependentId.trim()) {
      throw new HttpException(
        'PATIENT ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.updateDependentPatient(dependentId, updateDependentInfo);
  }
}
