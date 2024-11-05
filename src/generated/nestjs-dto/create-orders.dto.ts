
import {Prisma} from '@prisma/client'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateOrdersDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `number`,
  format: `double`,
})
totalAmount: Prisma.Decimal;
orderStatus: string;
}
