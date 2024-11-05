
import {ApiProperty} from '@nestjs/swagger'
import {TicketTransaction} from './ticketTransaction.entity'


export class PaymentStatus {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
statusName: string ;
description: string  | null;
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
TicketTransaction?: TicketTransaction[] ;
}
