
import {ApiProperty} from '@nestjs/swagger'
import {Speaker} from './speaker.entity'
import {Events} from './events.entity'


export class Schedule {
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
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityStart: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityEnd: Date ;
speaker?: Speaker ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
speakerId: number ;
event?: Events ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number ;
}
