import { IsOptional, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAppointmentsDto {
  @IsOptional()
  @IsString()
  treatement?: string;

  @IsDate()
  @IsNotEmpty()
  appointment: Date;

  @IsOptional()
  @IsString()
  patient_id?: string;

  @IsOptional()
  @IsString()
  dependent_patient_id?: string;

  @IsString()
  @IsNotEmpty()
  booked_by_id: string;
}
export class ReturnAppointmentDto {
  treatement: string | null;
  appointment: Date;
  patient_id: string | null;
  dependent_patient_id: string | null;
  booked_by_id: string;
  id: string;
  createdAt: Date;
  updateAt: Date;
}
export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsDate()
  appointment?: Date;
}
