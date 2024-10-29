
import {ApiProperty} from '@nestjs/swagger'


export class EventsDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
updatedAt: Date ;
createdBy: string  | null;
updatedBy: string  | null;
eventName: string ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventDateStart: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventDateEnd: Date ;
eventStatus: boolean ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventSeatMax: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventSeatCount: number ;
eventLogo: string ;
description: string  | null;
}
