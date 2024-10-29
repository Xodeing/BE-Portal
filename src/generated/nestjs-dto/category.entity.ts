
import {ApiProperty} from '@nestjs/swagger'


export class Category {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
}
