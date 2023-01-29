import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService  } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './service/category/category.module';
import { CategorySchema } from './schemas/category.schema';


@Module({
  imports: [
    CategoryModule,
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'), // Loaded from .ENV
      })
    })
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
