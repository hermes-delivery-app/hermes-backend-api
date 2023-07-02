import { Module }                       from '@nestjs/common';
import { MongooseModule }               from '@nestjs/mongoose';
import { ConfigModule, ConfigService  } from '@nestjs/config';

import { AppController }  from './app.controller';
import { AppService }     from './app.service';

import { UsersModule }    from './service/users/users.module';
import { AuthModule }     from './auth/auth.module';

import { ShopModule }     from './service/shop/shop.module';
import { CategoryModule } from './service/category/category.module';
import { ItemsModule }    from './service/items/items.module';
import { CartModule }     from './service/cart/cart.module';
import { CouriersModule } from './service/couriers/couriers.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ShopModule,
    CategoryModule,
    ItemsModule,
    CartModule,
    CouriersModule,
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'), // Loaded from .ENV
      })
    }),

    ConfigModule.forRoot({ isGlobal: true }),

    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: 'mongodb+srv://hermes:password@cluster0.vwv4lsa.mongodb.net/hermes',
    //   }),
    // }),

  ],

  controllers: [AppController],
  providers:   [AppService],
})

export class AppModule {}
