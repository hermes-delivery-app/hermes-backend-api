import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartSchema } from 'src/schemas/cart.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { ShopSchema } from 'src/schemas/shop.schema';
import { ItemSchema } from 'src/schemas/item.schema';

import { CartService }    from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [
      MongooseModule.forFeature([
          {
              name:       'Cart',
              schema:     CartSchema,
              collection: 'cart',
          },
          {
            name:       'User',
            schema:     UserSchema,
            collection: 'users',
        },
        {
            name:       'Shop',
            schema:     ShopSchema,
            collection: 'shops',
        },
        {
            name:       'Item',
            schema:     ItemSchema,
            collection: 'items',
        },
      ]),
  ],
  controllers: [CartController],
  providers:   [CartService],
  exports:     [CartService],
})
export class CartModule {}