
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'


export class EventCategories {
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
categoryName: string ;
status: boolean ;
Events?: Events[] ;
}
