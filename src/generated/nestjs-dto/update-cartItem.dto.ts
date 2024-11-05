
import {ApiProperty} from '@nestjs/swagger'




export class UpdateCartItemDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity?: number;
}
