
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateScheduleDto {
  createdBy?: string;
updatedBy?: string;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityStart: Date;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityEnd: Date;
}
