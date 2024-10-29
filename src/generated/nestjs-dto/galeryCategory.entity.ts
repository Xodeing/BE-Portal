
import {ApiProperty} from '@nestjs/swagger'
import {Galery} from './galery.entity'


export class GaleryCategory {
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
categoryGalery: string ;
Galery?: Galery[] ;
}
