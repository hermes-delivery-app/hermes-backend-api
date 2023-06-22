import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { CategoryService }   from 'src/service/category/category.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }
  
  @ApiOperation({description: "Створення нової категорії "})
  @Post()
  async create(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        newCategory: newCategory
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not created!',
        error: 'Bad Request'
      });
    }
  }

  @ApiOperation({description: "Виведення всіх категорій"})
  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.categoryService.getAll();

      return response.status(HttpStatus.OK).json({
        categories: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Виведення заархівованих категорій"})
  @Get('/archive')
  async getArchived(@Res() response) {
    try {
      const data = await this.categoryService.getArchived();

      return response.status(HttpStatus.OK).json({
        categories: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Виведення всієї інформації однієї категорії по ID"})
  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.categoryService.getOne(id);

      return response.status(HttpStatus.OK).json({
        category: existing
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Виведення всіх категорій для конкретного магазина"})
  @Get('/shop/:shopId')
  async getByShop(@Res() response, @Param('shopId') id: string) {
    try {
      const data = await this.categoryService.findByShop(id);

      return response.status(HttpStatus.OK).json({
        categories: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Оновлення однієї категорії"})
  @Put('/:id')
  async update(@Res() response, @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const existing = await this.categoryService.update(id, updateCategoryDto);

      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        existingCategory: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Видалення (архівація) однієї категорії"})
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleted = await this.categoryService.softDelete(id);

      return response.status(HttpStatus.OK).json({
        message: 'Category deleted successfully',
        deleteCategory: deleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


}