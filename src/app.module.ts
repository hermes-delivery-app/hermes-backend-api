import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { CategoryService } from './service/category/category.service';
import { CategoryController } from './service/category/category.controller';
import { CategorySchema } from './schemas/category.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/studentdb'),
  MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],

  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService],
})

export class AppModule {}
