
import {ApiProperty} from '@nestjs/swagger'


export class EventVenuesDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
}
