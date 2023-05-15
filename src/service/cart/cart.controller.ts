import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateCartDto } from 'src/dto/create-cart.dto';
import { UpdateCartDto } from 'src/dto/update-cart.dto';
import { CartService }   from 'src/service/cart/cart.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('cart')
export class CartController {

  constructor(private readonly cartService: CartService) { }

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

}