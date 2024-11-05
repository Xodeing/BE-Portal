
import {ApiProperty} from '@nestjs/swagger'
import {ShoppingSession} from './shoppingSession.entity'
import {EventTicket} from './eventTicket.entity'


export class CartItem {
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
sessionId: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
ticketId: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity: number ;
session?: ShoppingSession ;
ticket?: EventTicket ;
}
