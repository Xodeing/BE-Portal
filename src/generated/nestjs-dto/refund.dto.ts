
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class RefundDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `number`,
  format: `double`,
})
amount: Prisma.Decimal ;
reason: string  | null;
status: string ;
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
