import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateSponsorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sponsorName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sponsorWebLink: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sponsorLogo: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  // Tambahkan eventId agar sesuai dengan skema Prisma
  @ApiProperty()
  @IsNotEmpty()
  @IsInt() // Pastikan validasi tipe integer
  eventId: number;
}
