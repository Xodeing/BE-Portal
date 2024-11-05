
import {ApiProperty} from '@nestjs/swagger'




export class UpdateOrderItemDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity?: number;
}
