
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'
import {Sponsors} from './sponsors.entity'


export class EventSponsors {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
sponsorId: number ;
event?: Events ;
sponsor?: Sponsors ;
}
