import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { CategoryService } from 'src/service/category/category.service';

@Controller('categories')
export class CategoryController {

  constructor(private readonly categorySevice: CategoryService) { }

  @Post()
  async create(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categorySevice.create(createCategoryDto);

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

  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.categorySevice.getAll();

      return response.status(HttpStatus.OK).json({
        categories: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.categorySevice.getOne(id);

      return response.status(HttpStatus.OK).json({
        category: existing
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}