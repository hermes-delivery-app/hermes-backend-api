import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { OrderService }  from 'src/service/order/order.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrderController {

  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Res() response, @Body() createOrderDto: CreateOrderDto) {
    try {
      const newOrder = await this.orderService.create(createOrderDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Order has been created successfully',
        newOrder: newOrder
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Order not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.orderService.getAll();

      return response.status(HttpStatus.OK).json({
        orders: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.orderService.getOne(id);

      return response.status(HttpStatus.OK).json({
        order: existing
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Order not found!',
        error: 'Bad Request'
      });
    }
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto) {
    try {
      const existing = await this.orderService.update(id, updateOrderDto);

      return response.status(HttpStatus.OK).json({
        message: 'Order has been successfully updated',
        existingOrder: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}