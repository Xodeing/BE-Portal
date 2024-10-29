
import {ApiProperty} from '@nestjs/swagger'


export class EventType {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
}
