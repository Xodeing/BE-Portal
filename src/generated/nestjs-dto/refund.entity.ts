
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {TicketTransaction} from './ticketTransaction.entity'


export class Refund {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
ticketTransactionId: number ;
@ApiProperty({
  type: `number`,
  format: `double`,
})
amount: Prisma.Decimal ;
reason: string  | null;
status: string ;
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
ticketTransaction?: TicketTransaction ;
}
