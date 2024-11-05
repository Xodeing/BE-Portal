
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'
import {OrderItem} from './orderItem.entity'
import {TicketTransaction} from './ticketTransaction.entity'


export class Orders {
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
  type: `integer`,
  format: `int32`,
})
userId: number ;
@ApiProperty({
  type: `number`,
  format: `double`,
})
totalAmount: Prisma.Decimal ;
orderStatus: string ;
user?: Users ;
OrderItem?: OrderItem[] ;
TicketTransaction?: TicketTransaction[] ;
}
