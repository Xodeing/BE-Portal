
import {ApiProperty} from '@nestjs/swagger'


export class UserProfileDto {
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
firstName: string ;
lastName: string ;
phoneNumber: string ;
address: string ;
avatar: string ;
title: string ;
affiliateLink: string ;
}
