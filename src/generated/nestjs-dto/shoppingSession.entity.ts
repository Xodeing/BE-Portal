
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'
import {CartItem} from './cartItem.entity'


export class ShoppingSession {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
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
createdBy: string  | null;
updatedBy: string  | null;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
userId: number ;
user?: Users ;
CartItem?: CartItem[] ;
}
