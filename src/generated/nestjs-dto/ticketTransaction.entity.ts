
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'
import {PaymentMethodProvider} from './paymentMethodProvider.entity'
import {Orders} from './orders.entity'
import {PaymentStatus} from './paymentStatus.entity'
import {Refund} from './refund.entity'


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
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
participantId: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
paymentMethodProviderId: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
orderId: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
paymentStatusId: number ;
participant?: Users ;
paymentMethodProvider?: PaymentMethodProvider ;
order?: Orders ;
paymentStatus?: PaymentStatus ;
Refund?: Refund  | null;
}
