import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IAppointments } from './appointments.interface';
import {
  CreateAppointmentsDto,
  ReturnAppointmentDto,
  UpdateAppointmentDto,
} from 'src/dto/appointments.dto';
import { AppointmentsService } from './appointments.service';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}
  @Post('new')
  @UseGuards(JwtGuard)
  async createAppointments(
    @Request() req: { user: { id: string; username: string; roles: string[] } },
    @Body() createAppoinment: CreateAppointmentsDto,
  ): Promise<ReturnAppointmentDto> {
    return await this.appointmentService.createAppointments(
      req.user.id,
      createAppoinment,
    );
  }
  @Get('all')
  async getAllAppointments(): Promise<ReturnAppointmentDto[]> {
    return await this.appointmentService.getAllAppointments();
  }
  @Get('patient/all')
  async geAllAppointmentsByPatient(
    @Query('patientId') patient_id: string,
  ): Promise<ReturnAppointmentDto[]> {
    if (!patient_id.trim())
      throw new HttpException(
        'PATIENT ID is required it cannot be empty',
        HttpStatus.NOT_FOUND,
      );
    return await this.appointmentService.geAllAppointmentsByPatient(
      patient_id.trim(),
    );
  }
  @Get('dependentPatient/all')
  async getAllAppointmentsByDependent(
    @Query('dependentPatientId') dependentId: string,
  ): Promise<ReturnAppointmentDto[]> {
    if (!dependentId.trim())
      throw new HttpException(
        'DEPENDENT PATIENT ID is required it cannot be empty',
        HttpStatus.NOT_FOUND,
      );
    return await this.appointmentService.getAllAppointmentsByDependent(
      dependentId,
    );
  }
  @Get('appointmentId')
  async getAppointmentsById(
    @Query('appointmentId') id: string,
  ): Promise<ReturnAppointmentDto> {
    if (!id.trim()) {
      throw new HttpException(
        'APPOINTMENT ID is required it cannot be empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.appointmentService.getAppointmentsById(id);
  }
  @Patch('update')
  async updateAppointment(
    @Query('appointmentId') id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<ReturnAppointmentDto> {
    if (!id.trim()) {
      throw new HttpException(
        'APPOINTMENT ID is required it cannot be empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.appointmentService.updateAppointment(
      id,
      updateAppointmentDto,
    );
  }
  @Delete('delete')
  async deleteAppoinment(@Query('appointmentId') id: string): Promise<void> {
    if (!id.trim()) {
      throw new HttpException(
        'APPOINTMENT ID is required it cannot be empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.appointmentService.deleteAppoinment(id);
  }
}
