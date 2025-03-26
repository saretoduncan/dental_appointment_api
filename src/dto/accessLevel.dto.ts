import { IsNotEmpty, IsString } from 'class-validator';
export class AccessLevelReqDto {
  @IsNotEmpty()
  access_level: string;
}
export class UpdateAccessLevelDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  @IsString()
  access_level: string;
}
