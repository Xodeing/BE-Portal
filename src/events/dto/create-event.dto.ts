import {
  IsString,
  IsDateString,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Nama acara',
  })
  @IsString()
  eventName: string;

  @ApiProperty({
    description: 'Tanggal mulai acara',
    example: '2024-10-01T09:00:00Z',
  })
  @IsDateString()
  eventDateStart: string;

  @ApiProperty({
    description: 'Tanggal akhir acara',
    example: '2024-10-01T17:00:00Z',
  })
  @IsDateString()
  eventDateEnd: string;

  @ApiProperty({
    description: 'Status acara',
  })
  @IsBoolean()
  eventStatus: boolean;

  @ApiProperty({
    description: 'Maksimal jumlah tempat duduk yang tersedia',
  })
  @IsInt()
  eventSeatMax: number;

  @ApiProperty({
    description: 'Jumlah tempat duduk yang telah terisi',
  })
  @IsInt()
  eventSeatCount: number;

  @ApiProperty({
    description: 'Logo acara (URL)',
  })
  @IsString()
  eventLogo: string;

  @ApiProperty({
    description: 'Deskripsi acara',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID pengguna yang membuat acara',
  })
  @IsInt()
  userId: number; // Pastikan ini tidak opsional

  @ApiProperty({
    description: 'ID kategori acara (opsional)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  eventCategoryId?: number;

  @ApiProperty({
    description: 'ID user yang membuat acara (opsional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({
    description: 'ID user yang mengupdate acara (opsional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
