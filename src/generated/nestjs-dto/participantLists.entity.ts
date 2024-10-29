
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'
import {Events} from './events.entity'


export class ParticipantLists {
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
attendance: boolean ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
attendanceTime: Date ;
participant?: Users ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
participantId: number ;
event?: Events ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number ;
}
