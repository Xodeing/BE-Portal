import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventTicketDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ticketName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  typeTicket?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDecimal(
    { decimal_digits: '0,2' },
    { message: 'ticketPrice must be a decimal with up to 2 decimal places.' },
  )
  ticketPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  seatCount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  seatMax?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  saleStart?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  saleEnd?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
