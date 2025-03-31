import { IsString, IsOptional, IsEmail, IsDate, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsString()
  last_name: string;

  @IsString()
  national_id_no: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  phone_number: string;

  @IsString()
  residence: string;

  @IsDateString()
  date_of_birth: Date;
}

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  national_id_no?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  residence?: string;

  @IsOptional()
  @IsDate()
  date_of_birth?: Date;
}
export class CreateDependentPatientDto {
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsString()
  last_name: string;

  @IsDate()
  date_of_birth: Date;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  dependent_relationship: string;
}

export class UpdateDependentPatientDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsDate()
  date_of_birth?: Date;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  dependent_relationship?: string;
}
