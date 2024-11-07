import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShoppingSessionDto } from './dto/create-shopping-session.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class SessionCartService {
  constructor(private prisma: PrismaService) {}

  // Session Cart Methods
  async createSessionCart(createShoppingSessionDto: CreateShoppingSessionDto) {
    return await this.prisma.shoppingSession.create({
      data: createShoppingSessionDto,
    });
  }

  async getSessionCartByUserId(userId: number) {
    const session = await this.prisma.shoppingSession.findUnique({
      where: { userId },
      include: { CartItem: true },
    });
    if (!session)
      throw new NotFoundException(
        `Session cart not found for userId: ${userId}`,
      );
    return session;
  }

  // Cart Item Methods
  async addCartItem(createCartItemDto: CreateCartItemDto) {
    return await this.prisma.cartItem.create({
      data: createCartItemDto,
    });
  }

  async removeCartItem(id: number) {
    const cartItem = await this.prisma.cartItem.delete({
      where: { id },
    });
    if (!cartItem)
      throw new NotFoundException(`Cart item with id ${id} not found`);
    return { message: 'Item berhasil dihapus dari keranjang' };
  }

  async updateCartItem(id: number, updateCartItemDto: UpdateCartItemDto) {
    return await this.prisma.cartItem.update({
      where: { id },
      data: updateCartItemDto,
    });
  }
}
