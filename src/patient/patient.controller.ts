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

  @Post('new')
  async createPatientDto(@Body() patientInfo: CreatePatientDto) {
    return await this.patientService.addNewPatient(patientInfo);
  }
  @Post('new/dependent')
  async addDependent(
    @Query('primaryCaregiverId') primaryCaregiverId: string,
    dependentInfo: CreateDependentPatientDto,
  ) {
    if (!primaryCaregiverId?.trim()) {
      throw new HttpException(
        'PRIMARY CARERGIVER/GUARDIAN ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.patientService.addDependent(
      primaryCaregiverId.trim(),
      dependentInfo,
    );
  }
  @Get('all')
  async getAllPatients() {
    return this.patientService.getAllPatients();
  }
  @Get('patientId')
  async getPatientById(@Query('patientId') patientId: string) {
    if (!patientId.trim()) {
      throw new HttpException(
        'PATIENT ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.patientService.getPatientById(patientId);
  }
  @Get('dependentId')
  async getDependentPatientId(@Query('dependentId') dependentId: string) {
    if (!dependentId) {
      throw new HttpException(
        'DEPENDENT PATIENT ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.patientService.getDependentPatientById(dependentId);
  }
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
