import { ApiProperty } from '@nestjs/swagger';

export class EventsEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  eventName: string;

  @ApiProperty()
  eventDate: Date;

  @ApiProperty()
  eventDateEnd: Date;

  @ApiProperty()
  eventStatus: boolean;

  @ApiProperty()
  eventCategoryId: number;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  eventLogo: string;

  @ApiProperty()
  eventSeatCount: number;

  @ApiProperty()
  eventSeatMax: number;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty()
  userId: number;

  @ApiProperty({ required: false, nullable: true })
  description?: string;
}
