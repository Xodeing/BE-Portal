
import {Prisma} from '@prisma/client'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateRefundDto {
  @ApiProperty({
  type: `number`,
  format: `double`,
})
amount: Prisma.Decimal;
reason?: string;
status: string;
}
