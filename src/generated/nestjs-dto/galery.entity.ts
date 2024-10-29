
import {ApiProperty} from '@nestjs/swagger'
import {GaleryCategory} from './galeryCategory.entity'
import {Banner} from './banner.entity'


export class Galery {
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
namePicture: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
galeryCategoryId: number ;
galeryCategory?: GaleryCategory ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
bannerId: number ;
banner?: Banner ;
}
