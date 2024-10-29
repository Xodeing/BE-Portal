
import {ApiProperty} from '@nestjs/swagger'
import {Events} from './events.entity'


export class Venue {
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
venueName: string ;
venueDesc: string ;
venueAddress: string ;
venueCity: string ;
venueGMapsLocation: string ;
latitude: string ;
longitude: string ;
event?: Events  | null;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventId: number  | null;
}
