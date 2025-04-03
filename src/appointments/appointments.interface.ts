import {
  CreateAppointmentsDto,
  ReturnAppointmentDto,
  UpdateAppointmentDto,
} from 'src/dto/appointments.dto';

export interface IAppointments {
  createAppointments(
    userId: string,
    createAppoinment: CreateAppointmentsDto,
  ): Promise<ReturnAppointmentDto>;
  getAllAppointments(): Promise<ReturnAppointmentDto[]>;
  geAllAppointmentsByPatient(
    patient_id: string,
  ): Promise<ReturnAppointmentDto[]>;
  getAllAppointmentsByDependent(
    dependentId: string,
  ): Promise<ReturnAppointmentDto[]>;
  getAppointmentsById(id: string): Promise<ReturnAppointmentDto>;
  updateAppointment(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<ReturnAppointmentDto>;
  deleteAppoinment(id: string): void;
}
