
import {ApiProperty} from '@nestjs/swagger'


export class PaymentStatusDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
statusName: string ;
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
