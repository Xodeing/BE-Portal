import { PartialType } from '@nestjs/swagger';
import { CreateVenueDto } from './create-venue.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {
  @ApiPropertyOptional({
    description: 'Tanggal pembuatan tempat acara (otomatis)',
  })
  createdAt?: Date;

  @ApiPropertyOptional({
    description: 'Tanggal pembaruan tempat acara (otomatis)',
  })
  updatedAt?: Date;
}
