import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import * as argon2       from 'argon2';
import { JwtService }    from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthDto } from './dto/auth.dto';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService }  from 'src/service/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.getOneByPhoneNumber(createUserDto.phoneNumber);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashData = await argon2.hash(createUserDto.password);
    const newUser = await this.usersService.create({ ...createUserDto, password: hashData });

    const tokens = await this.getTokens(newUser._id, newUser.phoneNumber);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async signIn(authDto: AuthDto) {
    const { phoneNumber, password } = authDto;

    const user = await this.usersService.getOneByPhoneNumber(phoneNumber);
    if (!user) throw new BadRequestException('User does not exist');
    if (user.isArchived) throw new BadRequestException('User is deleted');

    if (!await argon2.verify(user.password, password)) throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user._id, user.phoneNumber);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
  }

  async getTokens(user_id: string, phoneNumber: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          user_id: user_id,
          phoneNumber: phoneNumber,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '60m',
        },
      ),
      this.jwtService.signAsync(
        {
          user_id: user_id,
          phoneNumber: phoneNumber,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(user_id: string, refreshToken: string) {
    const existing = await this.usersService.getOne(user_id);
    if (!existing || !existing.refreshToken) throw new ForbiddenException('Access Denied');

    if (!await argon2.verify(existing.refreshToken, refreshToken)) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(existing.id, existing.phoneNumber);
    await this.updateRefreshToken(existing.id, tokens.refreshToken);
    return tokens;
  }

}