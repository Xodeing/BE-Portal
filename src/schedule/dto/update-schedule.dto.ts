import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @IsOptional()
  @ApiProperty({
    description: 'The start date of the activity in ISO 8601 format',
    type: String,
    example: '2024-12-31T10:00:00.000Z',
  })
  @IsDateString(
    {},
    { message: 'Activity start date must be a valid ISO 8601 date string' },
  )
  activityStart?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The end date of the activity in ISO 8601 format',
    type: String,
    example: '2024-12-31T12:00:00.000Z',
  })
  @IsDateString(
    {},
    { message: 'Activity end date must be a valid ISO 8601 date string' },
  )
  activityEnd?: string;

  @IsOptional()
  @ApiProperty({
    description: 'ID of the speaker',
    type: Number,
  })
  @IsInt({ message: 'speakerId must be an integer number' })
  speakerId?: number;

  @IsOptional()
  @ApiProperty({
    description: 'ID of the event',
    type: Number,
  })
  @IsInt({ message: 'eventId must be an integer number' })
  eventId?: number;

  @IsOptional()
  @ApiProperty({
    description: 'Email of the user who updated the schedule',
    type: String,
  })
  @IsString({ message: 'updatedBy must be a string' })
  updatedBy?: string;
}
