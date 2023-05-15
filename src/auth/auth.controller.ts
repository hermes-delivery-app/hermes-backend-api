import { Body, Controller, Get, HttpCode, HttpStatus, Post ,Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

import { CreateUserDto } from 'src/dto/create-user.dto';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth('JWT-auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({description: "Регистрация. При успешном запросе пользователь добавляется в БД users, его пароль шифруется перед добавлением"})
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  // @Post('verificate')
  //   verificatePhoneNumber(@Body() data: PhoneNumberDto) {
  //   if (request.user.isPhoneNumberConfirmed) {
  //     throw new BadRequestException('Phone number already confirmed');
  //   }
  //   return this.authService.verificatePhoneNumber(data);
  // }

  @ApiOperation({description: "Вход. При успешном вводе данных пользователя, совпадающих с данными введенными при регистрации, выдается access token"})
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @ApiOperation({description: "Выход. Защищенный роут. Если в заголовке запроса передается access token - выполняется выход (токен пользователя обнуляется) и возвращается статус 200 (ok). Если в запросе нет токена - возвращает ошибку 401 (unauthorized). "})
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @ApiOperation({description: "Обновление токенов. Если в заголовке запроса передается refresh token - генерируются новые access и refresh токены"})
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
}


}