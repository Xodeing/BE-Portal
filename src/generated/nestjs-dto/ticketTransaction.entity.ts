
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'
import {EventTicket} from './eventTicket.entity'


export class TicketTransaction {
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
participant?: Users ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
participantId: number ;
ticket?: EventTicket ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
ticketId: number ;
}
