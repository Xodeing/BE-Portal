import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetEventsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1; // Default ke 1

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  perPage?: number = 6; // Default ke 6

  @IsOptional()
  @IsString()
  startDate?: string; // Tanggal dalam format "YYYY-MM-DD"

  @IsOptional()
  @IsString()
  endDate?: string; // Tanggal dalam format "YYYY-MM-DD"

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  eventCategory?: number;
}
