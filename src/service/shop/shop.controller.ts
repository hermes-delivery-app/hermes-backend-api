import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';

import { ShopService }   from './shop.service';
import { CreateShopDto } from 'src/dto/create-shop.dto';
import { UpdateShopDto } from 'src/dto/update-shop.dto';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddItemDto } from 'src/dto/create-cart.dto';

@Controller('shops')
@ApiTags('shops')
export class ShopController {

  constructor(private readonly shopService: ShopService) { }

  @ApiOperation({description: "Добавление магазина в БД. "})
  @Post()
  async create(@Res() response, @Body() createShopDto: CreateShopDto) {
    try {
      const newShop = await this.shopService.create(createShopDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Shop has been created successfully',
        newShop: newShop
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Shop not created!',
        error: 'Bad Request'
      });
    }
  }

  @ApiOperation({description: "Вывод магазина по Id. "})
  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.shopService.getOne(id);

      return response.status(HttpStatus.OK).json({
        shop: existing
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @ApiOperation({description: "Вывод всех магазинов из БД. "})
  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.shopService.getAll();

      return response.status(HttpStatus.OK).json({
        shops: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Вывод (удаленных) магазинов из архива"})
  @Get('/archive')
  async getArchived(@Res() response) {
    try {
      const data = await this.shopService.getArchived();

      return response.status(HttpStatus.OK).json({
        shops: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Поиск магазинов"})
  @Get('/search/:query')
  async getSearched(@Res() response, @Param('query') query: string) {
    try {
      const data = await this.shopService.search(query);

      return response.status(HttpStatus.OK).json({
        shops: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Изменение магазина по id"})
  @Put('/:id')
  async update(@Res() response, @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto) {
    try {
      const existing = await this.shopService.update(id, updateShopDto);
      return response.status(HttpStatus.OK).json({
        message: 'Shop has been successfully updated',
        existingShop: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/rate/positive/:shopId')
  async updatePositiveRating(@Res() response, @Param('shopId') id: string) {
    try {
      const existing = await this.shopService.rateShop(true, id);
      return response.status(HttpStatus.OK).json({
        message: 'Shop has been successfully updated',
        existingShop: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/rate/negative/:shopId')
  async updateNegativeRating(@Res() response, @Param('shopId') id: string) {
    try {
      const existing = await this.shopService.rateShop(false, id);
      return response.status(HttpStatus.OK).json({
        message: 'Shop has been successfully updated',
        existingShop: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Удаление магазина - перенос в архив"})
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleted = await this.shopService.softDelete(id);
      return response.status(HttpStatus.OK).json({
        message: 'Shop deleted successfully',
        deleteShop: deleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  
}
