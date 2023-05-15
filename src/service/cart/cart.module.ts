import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartSchema }     from 'src/schemas/cart.schema';
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
      ]),
  ],
  controllers: [CartController],
  providers:   [CartService],
  exports:     [CartService],
})
export class CartModule {}