import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventCategoryDto {
  @ApiPropertyOptional({
    description: 'Nama kategori acara',
  })
  @IsString()
  @IsOptional()
  categoryName?: string;

  @ApiPropertyOptional({
    description: 'Status kategori acara',
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional({
    description: 'ID user yang membuat kategori (opsional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  createdBy?: string;

  @ApiPropertyOptional({
    description: 'ID user yang mengupdate kategori (opsional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;
}
