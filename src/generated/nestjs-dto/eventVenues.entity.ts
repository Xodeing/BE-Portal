
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'
import {Venue} from './venue.entity'


export class EventVenues {
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
venueId: number ;
event?: Events ;
venue?: Venue ;
}
