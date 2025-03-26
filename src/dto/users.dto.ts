import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UsersDtoReq {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  first_name: string;
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  last_name: string;
  @IsString()
  @IsOptional()
  middle_name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(10)
  @MaxLength(12)
  @IsNotEmpty()
  phone_number: string;
  @IsEmail()
  @IsNotEmpty()
  work_email: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  national_id_no: string;
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  keen_first_name: string;
  @IsString()
  @IsNotEmpty()
  role: string;
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  keen_last_name: string;
  @IsEmail()
  @IsOptional()
  keen_email_address: string;
  @IsString()
  @MinLength(10)
  @MaxLength(12)
  @IsNotEmpty()
  keen_phone_number: string;
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  keen_relationship: string;
}
