
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'


export class Token {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
userId: number ;
token: string ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
user?: Users ;
}
