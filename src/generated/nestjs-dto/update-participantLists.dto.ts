
import {ApiProperty} from '@nestjs/swagger'




export class UpdateParticipantListsDto {
  createdBy?: string;
updatedBy?: string;
attendance?: boolean;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
attendanceTime?: Date;
}
