
import {ApiProperty} from '@nestjs/swagger'




export class UpdateScheduleDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityStart?: Date;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityEnd?: Date;
}
