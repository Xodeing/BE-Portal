
import {ApiProperty} from '@nestjs/swagger'


export class ScheduleDto {
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
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityStart: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
activityEnd: Date ;
}
