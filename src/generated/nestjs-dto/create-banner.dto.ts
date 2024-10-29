
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateBannerDto {
  createdBy?: string;
updatedBy?: string;
titleBanner: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
seatMax: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
speakerCount: number;
city: string;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
eventTime: Date;
}
