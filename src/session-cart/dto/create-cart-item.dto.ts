import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({
    description: 'ID session shopping',
    type: Number,
  })
  sessionId: number; // ID session shopping

  @ApiProperty({
    description: 'ID tiket yang ditambahkan ke keranjang',
    type: Number,
  })
  ticketId: number; // ID tiket yang ditambahkan ke keranjang

  @ApiProperty({
    description: 'Jumlah tiket',
    type: Number,
  })
  quantity: number; // Jumlah tiket

  @ApiProperty({
    description: 'ID atau nama pengguna yang membuat item keranjang (opsional)',
    type: String,
    required: false, // Menandakan bahwa properti ini tidak wajib
  })
  createdBy?: string; // Optional, untuk menyimpan ID atau nama pengguna yang membuat
}
