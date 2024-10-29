
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateParticipantListsDto {
  createdBy?: string;
updatedBy?: string;
attendance: boolean;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
attendanceTime: Date;
}
