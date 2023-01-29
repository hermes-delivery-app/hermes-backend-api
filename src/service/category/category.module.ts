import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/schemas/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Category',
                schema: CategorySchema,
            },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    // providers: [
    //     {
    //       provide: 'ICategory',
    //       useClass: CategoryService
    //     }
    //   ],
    exports: [CategoryService],
})
export class CategoryModule { }