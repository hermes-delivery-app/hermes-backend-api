import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UsersService }  from 'src/service/users/users.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser: newUser
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async getAll(@Res() response) {
    try {
      const data = await this.usersService.getAll();

      return response.status(HttpStatus.OK).json({
        users: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Вывод (удаленных) пользователей из архива"})
  @Get('/archive')
  async getArchived(@Res() response) {
    try {
      const data = await this.usersService.getArchived();

      return response.status(HttpStatus.OK).json({
        users: data
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const existing = await this.usersService.getOne(id);

      return response.status(HttpStatus.OK).json({
        user: existing
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not found!',
        error: 'Bad Request'
      });
    }
  }

  @Get('/phone/:phoneNumber')
  async getByPhoneNumber(@Res() response, @Param('phoneNumber') phoneNumber: string) {
    try {
      const existing = await this.usersService.findByPhoneNumber(phoneNumber);

      return response.status(HttpStatus.OK).json({
        user: existing
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto) {
    try {
      const existing = await this.usersService.update(id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser: existing,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiOperation({description: "Удаление пользователя - перенос в архив"})
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleted = await this.usersService.softDelete(id);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deleteUser: deleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}