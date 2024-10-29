import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class UpdateAuthDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(6, 20)
  @IsOptional()
  password?: string;
}
