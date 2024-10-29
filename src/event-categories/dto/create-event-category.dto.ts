import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventCategoryDto {
  @ApiProperty({
    description: 'Nama kategori acara',
  })
  @IsString()
  categoryName: string;

  @ApiProperty({
    description: 'Status kategori acara',
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'ID user yang membuat kategori (opsional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  createdBy?: string;

  @ApiProperty({
    description: 'ID user yang mengupdate kategori (opsional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;
}
