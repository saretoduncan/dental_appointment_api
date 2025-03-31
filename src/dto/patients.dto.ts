import { IsString, IsOptional, IsEmail, IsDateString } from "class-validator";

export class CreatePatientDto {
    @IsString()
    first_name: string;
  
    @IsOptional()
    @IsString()
    middle_name?: string;
  
    @IsString()
    last_name: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    phone_number?: string;
  
    @IsString()
    residence: string;
  
    @IsDateString() // Ensures a valid date format (ISO 8601)
    date_of_birth: string;
  
    @IsOptional()
    @IsString()
    guardian_name?: string;
  
    @IsOptional()
    @IsString()
    guardian_number?: string;
  
    @IsOptional()
    @IsString()
    guardian_relationship?: string;
  }