import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingSessionDto {
  @ApiProperty({
    description: 'ID pengguna yang membuat sesi belanja',
    type: Number,
  })
  userId: number;

  @ApiProperty({
    description: 'ID atau nama pengguna yang membuat sesi belanja (opsional)',
    type: String,
    required: false, // Menandakan bahwa properti ini tidak wajib
  })
  createdBy?: string; // Optional, untuk menyimpan ID atau nama pengguna yang membuat
}
