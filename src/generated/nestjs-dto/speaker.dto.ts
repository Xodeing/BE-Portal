
import {ApiProperty} from '@nestjs/swagger'


export class SpeakerDto {
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
name: string ;
profession: string ;
instagram: string  | null;
x: string  | null;
facebook: string  | null;
linkedin: string  | null;
photo: string  | null;
}
