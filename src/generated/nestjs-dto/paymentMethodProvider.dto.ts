
import {ApiProperty} from '@nestjs/swagger'


export class PaymentMethodProviderDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
}
