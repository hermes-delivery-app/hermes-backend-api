import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorySchema }     from 'src/schemas/category.schema';
import { ShopSchema }         from 'src/schemas/shop.schema';

import { CategoryService }    from './category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name:       'Category',
                schema:     CategorySchema,
                collection: 'categories',
            },
            {
                name:       'Shop',
                schema:     ShopSchema,
                collection: 'shops',
            },
        ]),
    ],
    controllers: [CategoryController],
    providers:   [CategoryService],
    exports:     [CategoryService],
})
export class CategoryModule { }