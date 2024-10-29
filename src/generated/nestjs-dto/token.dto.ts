
import {ApiProperty} from '@nestjs/swagger'


export class TokenDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
token: string ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
}
