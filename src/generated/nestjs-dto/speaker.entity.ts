
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'
import {Schedule} from './schedule.entity'


export class Speaker {
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
name: string ;
profession: string ;
instagram: string  | null;
x: string  | null;
facebook: string  | null;
linkedin: string  | null;
photo: string  | null;
event?: Events ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number ;
schedules?: Schedule[] ;
}
