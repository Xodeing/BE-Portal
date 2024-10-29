
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'
import {Galery} from './galery.entity'


export class Banner {
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
titleBanner: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
seatMax: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
speakerCount: number ;
city: string ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventTime: Date ;
event?: Events ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number ;
Galery?: Galery[] ;
}
