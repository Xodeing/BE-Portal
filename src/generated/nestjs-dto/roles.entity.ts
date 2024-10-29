
import {ApiProperty} from '@nestjs/swagger'
import {Users} from './users.entity'


export class Roles {
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
roleName: string ;
description: string ;
status: boolean  | null;
Users?: Users[] ;
}
