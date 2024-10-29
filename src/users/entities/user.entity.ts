import { ApiProperty } from '@nestjs/swagger';
import { Users as PrismaUser } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements PrismaUser {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @Exclude() // Exclude password from the response to protect it
  password: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty({ required: false, nullable: true }) // Can be null or optional
  createdBy: string | null;

  @ApiProperty({ required: false, nullable: true }) // Can be null or optional
  googleId: string | null;

  @ApiProperty({ required: false, nullable: true }) // Can be null or optional
  updatedBy: string | null;

  @ApiProperty()
  status: boolean;
}
