import {
  IsEmail,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nama pengguna',
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiPropertyOptional({
    description: 'Email pengguna',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password pengguna, minimal 6 karakter',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    description: 'ID user yang memperbarui data',
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiPropertyOptional({
    description: 'Status pengguna (aktif/non-aktif)',
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({
    description: 'ID role pengguna',
  })
  @IsOptional()
  @IsInt()
  roleId?: number;

  @ApiPropertyOptional({
    description: 'ID user yang membuat data (opsional)',
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional({
    description: 'ID Google yang terkait dengan pengguna (opsional)',
  })
  @IsOptional()
  @IsString()
  googleId?: string;
}
