export class CreateCartItemDto {
  sessionId: number; // ID session shopping
  ticketId: number; // ID tiket yang ditambahkan ke keranjang
  quantity: number; // Jumlah tiket
  createdBy?: string; // Optional, untuk menyimpan ID atau nama pengguna yang membuat
}
