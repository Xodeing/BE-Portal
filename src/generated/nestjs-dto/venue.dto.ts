
import {ApiProperty} from '@nestjs/swagger'


export class VenueDto {
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
}
