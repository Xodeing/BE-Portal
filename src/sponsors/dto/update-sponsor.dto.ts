import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSponsorDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  sponsorName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sponsorWebLink?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sponsorLogo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
