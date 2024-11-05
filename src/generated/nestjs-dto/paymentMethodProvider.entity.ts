
import {ApiProperty} from '@nestjs/swagger'
import {PaymentMethod} from './paymentMethod.entity'
import {Provider} from './provider.entity'
import {TicketTransaction} from './ticketTransaction.entity'


export class PaymentMethodProvider {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
paymentMethodId: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
providerId: number ;
paymentMethod?: PaymentMethod ;
provider?: Provider ;
TicketTransaction?: TicketTransaction[] ;
}
