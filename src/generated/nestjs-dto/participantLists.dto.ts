
import {ApiProperty} from '@nestjs/swagger'


export class ParticipantListsDto {
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
attendance: boolean ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
attendanceTime: Date ;
}
