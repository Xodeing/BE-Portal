
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'
import {TicketTransaction} from './ticketTransaction.entity'


export class EventTicket {
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
ticketName: string ;
typeTicket: string ;
@ApiProperty({
  type: `number`,
  format: `double`,
})
ticketPrice: Prisma.Decimal ;
description: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
seatCount: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
seatMax: number ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
saleStart: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
saleEnd: Date ;
status: boolean ;
event?: Events ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number ;
TicketTransaction?: TicketTransaction[] ;
}
