
import {ApiProperty} from '@nestjs/swagger'
import {Orders} from './orders.entity'
import {EventTicket} from './eventTicket.entity'


export class OrderItem {
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
orderId: number ;
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
order?: Orders ;
ticket?: EventTicket ;
}
