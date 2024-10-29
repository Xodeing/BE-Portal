
import {ApiProperty} from '@nestjs/swagger'


export class EventTypeDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
}
