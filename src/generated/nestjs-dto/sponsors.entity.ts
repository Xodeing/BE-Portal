
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'


export class Sponsors {
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
sponsorName: string ;
sponsorWebLink: string ;
sponsorLogo: string ;
event?: Events  | null;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number  | null;
}
