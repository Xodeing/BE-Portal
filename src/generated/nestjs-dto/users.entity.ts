
import {ApiProperty} from '@nestjs/swagger'
import {Roles} from './roles.entity'
import {Events} from './events.entity'
import {ParticipantLists} from './participantLists.entity'
import {TicketTransaction} from './ticketTransaction.entity'
import {UserProfile} from './userProfile.entity'
import {Token} from './token.entity'


export class Users {
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
userName: string ;
email: string ;
password: string ;
status: boolean ;
googleId: string  | null;
role?: Roles ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
roleId: number ;
Events?: Events[] ;
ParticipantLists?: ParticipantLists[] ;
TicketTransaction?: TicketTransaction[] ;
userProfileId?: UserProfile[] ;
tokens?: Token[] ;
}
