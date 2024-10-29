import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @ApiProperty() // Menghapus { required: false }
  @IsNotEmpty() // Mengubah dari opsional menjadi wajib
  @IsString()
  description: string; // Menghapus tanda tanya untuk menjadikannya wajib

  @ApiProperty({ required: false })
  @IsString()
  createdBy?: string;

  @ApiProperty({ required: false })
  @IsString()
  updatedBy?: string;
}
