
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateEventTicketDto {
  createdBy?: string;
updatedBy?: string;
ticketName?: string;
typeTicket?: string;
@ApiProperty({
  type: `number`,
  format: `double`,
})
ticketPrice?: Prisma.Decimal;
description?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
seatCount?: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
seatMax?: number;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
saleStart?: Date;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
saleEnd?: Date;
status?: boolean;
}
