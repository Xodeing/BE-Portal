
import {ApiProperty} from '@nestjs/swagger'
import {PaymentMethodProvider} from './paymentMethodProvider.entity'


export class Provider {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
providerCode: string ;
providerName: string ;
logoUrl: string ;
supportTransfer: boolean ;
supportVa: boolean ;
vaPrefix: string  | null;
currency: string ;
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
