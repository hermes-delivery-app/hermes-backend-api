import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService  } from '@nestjs/config';
// import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './service/category/category.module';
import { CategorySchema } from './schemas/category.schema';

import { UsersModule } from './service/users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    CategoryModule,
    UsersModule,
    AuthModule,
    
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     uri: config.get<string>('MONGO_URI'), // Loaded from .ENV
    //   })
    // })

    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://hermes:9zxK74V3sEyn@cluster0.vwv4lsa.mongodb.net/hermes',
      }),
    }),

    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     TWILIO_ACCOUNT_SID: Joi.string().required(),
    //     TWILIO_AUTH_TOKEN: Joi.string().required(),
    //     TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required()
    //     // ...
    //   })
    // }),

  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
