import { Module }    from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenStrategy} from './strategies/accessToken.strategy';
import { RefreshTokenStrategy} from './strategies/refreshToken.strategy';

import { AuthController } from './auth.controller';
import { AuthService }    from './auth.service';

import { UsersModule } from 'src/service/users/users.module';

@Module({
  imports:     [JwtModule.register({}),UsersModule],
  controllers: [AuthController],
  providers:   [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}