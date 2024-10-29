import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ticketName: string; // Menambahkan ticketName sesuai schema

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  typeTicket: string; // Menambahkan typeTicket sesuai schema

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'ticketPrice must be a valid number.' },
  )
  ticketPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  seatCount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  seatMax: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  saleStart: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  saleEnd: Date;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  eventId: number;
}
