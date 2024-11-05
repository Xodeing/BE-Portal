
import {ApiProperty} from '@nestjs/swagger'
import {PaymentMethodProvider} from './paymentMethodProvider.entity'


export class PaymentMethod {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
methodName: string ;
providerName: string ;
status: boolean ;
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
PaymentMethodProvider?: PaymentMethodProvider[] ;
}
