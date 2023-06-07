import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateItemDto } from 'src/dto/create-item.dto';
import { UpdateItemDto } from 'src/dto/update-item.dto';
import { ItemsService }  from 'src/service/items/items.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('items')
@ApiTags('items')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) { }
  
  @Post()
  async create(@Res() response, @Body() createItemDto: CreateItemDto) {
    try {
      const newItem = await this.itemsService.create(createItemDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Item has been created successfully',
        newItem: newItem
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Item not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.itemsService.getAll();

      return response.status(HttpStatus.OK).json({
        items: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/archive')
  async getArchived(@Res() response) {
    try {
      const data = await this.itemsService.getArchived();

      return response.status(HttpStatus.OK).json({
        items: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/category/:categoryId')
  async getByCategory(@Res() response, @Param('categoryId') id: string) {
    try {
      const data = await this.itemsService.findByCategory(id);

      return response.status(HttpStatus.OK).json({
        items: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.itemsService.getOne(id);

      return response.status(HttpStatus.OK).json({
        item: existing
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto) {
    try {
      const existing = await this.itemsService.update(id, updateItemDto);
      return response.status(HttpStatus.OK).json({
        message: 'Item has been successfully updated',
        existingItem: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleted = await this.itemsService.softDelete(id);
      return response.status(HttpStatus.OK).json({
        message: 'Item deleted successfully',
        deleteItem: deleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


}