
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateOrderItemDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity: number;
}
