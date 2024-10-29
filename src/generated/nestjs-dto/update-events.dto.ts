
import {ApiProperty} from '@nestjs/swagger'




export class UpdateEventsDto {
  createdBy?: string;
updatedBy?: string;
eventName?: string;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventDateStart?: Date;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventDateEnd?: Date;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventSeatMax?: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventSeatCount?: number;
eventLogo?: string;
description?: string;
}
