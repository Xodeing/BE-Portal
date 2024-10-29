
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'
import {EventCategories} from './eventCategories.entity'
import {Schedule} from './schedule.entity'
import {Speaker} from './speaker.entity'
import {ParticipantLists} from './participantLists.entity'
import {EventTicket} from './eventTicket.entity'
import {Venue} from './venue.entity'
import {Sponsors} from './sponsors.entity'
import {Banner} from './banner.entity'


export class Events {
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
eventName: string ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventDateStart: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventDateEnd: Date ;
eventStatus: boolean ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventSeatMax: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventSeatCount: number ;
eventLogo: string ;
description: string  | null;
user?: Users ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
userId: number ;
eventCategory?: EventCategories  | null;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
eventCategoryId: number  | null;
Schedule?: Schedule[] ;
Speaker?: Speaker[] ;
ParticipantLists?: ParticipantLists[] ;
EventTicket?: EventTicket[] ;
Venue?: Venue[] ;
Sponsors?: Sponsors[] ;
Banner?: Banner[] ;
}
