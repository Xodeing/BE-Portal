
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateOrdersDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `number`,
  format: `double`,
})
totalAmount?: Prisma.Decimal;
orderStatus?: string;
}
