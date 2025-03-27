import {
  isEmail,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  minLength,
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
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  confirmPassword: string;
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
export class UserProfileDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  first_name: string;
  @IsString()
  @IsOptional()
  @MinLength(3)
  middle_name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsOptional()
  @MinLength(10)
  @MaxLength(12)
  phone_number: string;
  @IsOptional()
  @IsEmail()
  work_email: string;
}
