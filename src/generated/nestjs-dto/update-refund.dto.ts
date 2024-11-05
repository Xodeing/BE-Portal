
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateRefundDto {
  @ApiProperty({
  type: `number`,
  format: `double`,
})
amount?: Prisma.Decimal;
reason?: string;
status?: string;
}
