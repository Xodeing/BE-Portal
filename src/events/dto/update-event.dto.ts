import {
  IsString,
  IsDateString,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({
    description: 'ID acara (harus diisi)',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Nama acara',
    required: false,
  })
  @IsOptional()
  @IsString()
  eventName?: string;

  @ApiProperty({
    description: 'Tanggal mulai acara',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  eventDateStart?: string;

  @ApiProperty({
    description: 'Tanggal akhir acara',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  eventDateEnd?: string;

  @ApiProperty({
    description: 'Status acara',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  eventStatus?: boolean;

  @ApiProperty({
    description: 'Maksimal jumlah tempat duduk yang tersedia',
    required: false,
  })
  @IsOptional()
  @IsInt()
  eventSeatMax?: number;

  @ApiProperty({
    description: 'Jumlah tempat duduk yang telah terisi',
    required: false,
  })
  @IsOptional()
  @IsInt()
  eventSeatCount?: number;

  @ApiProperty({
    description: 'Logo acara (URL)',
    required: false,
  })
  @IsOptional()
  @IsString()
  eventLogo?: string;

  @ApiProperty({
    description: 'Deskripsi acara',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID kategori acara (opsional)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  eventCategoryId?: number;

  @ApiProperty({
    description: 'ID user yang mengupdate acara (opsional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
