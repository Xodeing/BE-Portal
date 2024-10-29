import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty({
    description: 'Nama tempat acara',
  })
  @IsNotEmpty()
  @IsString()
  venueName: string;

  @ApiProperty({
    description: 'Deskripsi tempat acara',
  })
  @IsNotEmpty()
  @IsString()
  venueDesc: string;

  @ApiProperty({
    description: 'Alamat tempat acara',
  })
  @IsNotEmpty()
  @IsString()
  venueAddress: string;

  @ApiProperty({
    description: 'Kota tempat acara',
  })
  @IsNotEmpty()
  @IsString()
  venueCity: string;

  @ApiProperty({
    description: 'Link lokasi Google Maps tempat acara',
  })
  @IsNotEmpty()
  @IsString()
  venueGMapsLocation: string;

  @ApiProperty({
    description: 'Latitude tempat acara',
    example: '-6.200000',
  })
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @ApiProperty({
    description: 'Longitude tempat acara',
    example: '106.816666',
  })
  @IsNotEmpty()
  @IsString()
  longitude: string;

  @ApiProperty({
    description: 'ID event yang terhubung dengan tempat acara',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  eventId: number; // Tambahkan ini agar bisa menghubungkan dengan tabel `Events`

  @ApiProperty({
    description: 'ID user yang membuat tempat acara (opsional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({
    description: 'ID user yang mengupdate tempat acara (opsional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
