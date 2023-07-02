import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from 'src/schemas/order.schema';
import { CartSchema }  from 'src/schemas/cart.schema';
import { ShopSchema }  from 'src/schemas/shop.schema';

import { OrderService }    from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
      MongooseModule.forFeature([
          {
              name:       'Order',
              schema:     OrderSchema,
              collection: 'order',
          },
          {
            name:       'Cart',
            schema:     CartSchema,
            collection: 'cart',
        },
        {
            name:       'Shop',
            schema:     ShopSchema,
            collection: 'shops',
        },
      ]),
  ],
  controllers: [OrderController],
  providers:   [OrderService],
  exports:     [OrderService],
})
export class OrderModule {}