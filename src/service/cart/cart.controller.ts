import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateCartDto, AddItemDto, RemoveItemDto } from 'src/dto/create-cart.dto';
import { CartService }               from 'src/service/cart/cart.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('cart')
export class CartController {

  constructor(private readonly cartService: CartService) { }

  @Post()
  async create(@Res() response, @Body() createCartDto: CreateCartDto) {
    try {
      const newCart = await this.cartService.create(createCartDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Cart has been created successfully',
        newCart: newCart
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

@Get()
async getAll(@Res() response) {
  try {
    const data = await this.cartService.getAll();

    return response.status(HttpStatus.OK).json({
      carts: data
    });
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
}

@Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.cartService.getOne(id);

      return response.status(HttpStatus.OK).json({
        cart: existing
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/add/:id')
  async addItem(@Res() response, @Param('id') id: string,
  @Body() itemDto: AddItemDto) {
    try{
      const cart = await this.cartService.addItem(id, itemDto);

      return response.status(HttpStatus.OK).json({
        message: 'Cart has been successfully updated',
        cart: cart
      });
    }
    catch (err) {
      return response.status(err.status).json(err.response);
  }
}

@Put('remove/:id')
  async removeItem(@Res() response, @Param('id') id: string,
  @Body() removeItemDto: RemoveItemDto) {
    try{
      const cart = await this.cartService.removeItem(id, removeItemDto);

      return response.status(HttpStatus.OK).json({
        message: 'Cart has been successfully updated',
        cart: cart
      });
    }
    catch (err) {
      return response.status(err.status).json(err.response);
  }
}

@Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleted = await this.cartService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'Cart deleted successfully',
        cart: deleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }



}