import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty({
    description: 'Jumlah tiket yang diperbarui (opsional)',
    type: Number,
    required: false, // Menandakan bahwa properti ini opsional
  })
  quantity?: number; // Opsional, untuk memperbarui jumlah item

  @ApiProperty({
    description: 'ID atau nama pengguna yang memperbarui item (opsional)',
    type: String,
    required: false, // Menandakan bahwa properti ini opsional
  })
  updatedBy?: string; // Opsional, untuk menyimpan ID atau nama pengguna yang memperbarui
}
