
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateCartItemDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity: number;
}
