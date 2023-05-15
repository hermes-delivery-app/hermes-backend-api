import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopSchema }     from 'src/schemas/shop.schema';
import { ShopService }    from './shop.service';
import { ShopController } from './shop.controller';
import { CartSchema } from 'src/schemas/cart.schema';
import { ItemSchema } from 'src/schemas/item.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
          {
              name: 'Shop',
              schema: ShopSchema,
              collection: 'shops',
          }
      ]),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
