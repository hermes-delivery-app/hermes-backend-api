import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateCourierDto } from 'src/dto/create-courier.dto';
import { UpdateCourierDto } from 'src/dto/update-courier.dto';
import { CouriersService }  from 'src/service/couriers/couriers.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('couriers')
@ApiTags('couriers')
export class CouriersController {

  constructor(private readonly couriersService: CouriersService) { }

  @Post()
  async create(@Res() response, @Body() createCourierDto: CreateCourierDto) {
    try {
      const newCourier = await this.couriersService.create(createCourierDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Courier has been created successfully',
        newCourier: newCourier
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Courier not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.couriersService.getAll();

      return response.status(HttpStatus.OK).json({
        couriers: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/archive')
  async getArchived(@Res() response) {
    try {
      const data = await this.couriersService.getArchived();

      return response.status(HttpStatus.OK).json({
        couriers: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.couriersService.getOne(id);

      return response.status(HttpStatus.OK).json({
        courier: existing
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Courier not found!',
        error: 'Bad Request'
      });
    }
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string,
    @Body() updateCourierDto: UpdateCourierDto) {
    try {
      const existing = await this.couriersService.update(id, updateCourierDto);

      return response.status(HttpStatus.OK).json({
        message: 'Courier has been successfully updated',
        existingCourier: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleted = await this.couriersService.softDelete(id);

      return response.status(HttpStatus.OK).json({
        message: 'Courier deleted successfully',
        deleteCourier: deleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}