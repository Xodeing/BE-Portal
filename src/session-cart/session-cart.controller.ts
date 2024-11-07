import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { SessionCartService } from './session-cart.service';
import { CreateShoppingSessionDto } from './dto/create-shopping-session.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Session-cart')
@Controller('session-cart')
export class SessionCartController {
  constructor(private readonly sessionCartService: SessionCartService) {}

  // Session Cart Endpoints
  @Post()
  async createSessionCart(
    @Body() createShoppingSessionDto: CreateShoppingSessionDto,
  ) {
    return await this.sessionCartService.createSessionCart(
      createShoppingSessionDto,
    );
  }

  @Get(':userId')
  async getSessionCartByUserId(@Param('userId') userId: number) {
    return await this.sessionCartService.getSessionCartByUserId(userId);
  }

  // Cart Item Endpoints
  @Post('cart-items')
  async addCartItem(@Body() createCartItemDto: CreateCartItemDto) {
    return await this.sessionCartService.addCartItem(createCartItemDto);
  }

  @Delete('cart-items/:id')
  async removeCartItem(@Param('id') id: number) {
    return await this.sessionCartService.removeCartItem(id);
  }

  @Put('cart-items/:id')
  async updateCartItem(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return await this.sessionCartService.updateCartItem(id, updateCartItemDto);
  }
}
