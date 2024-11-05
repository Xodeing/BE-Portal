
import {ApiProperty} from '@nestjs/swagger'


export class PaymentMethodDto {
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
}
