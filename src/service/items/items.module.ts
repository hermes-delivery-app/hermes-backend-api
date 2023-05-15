import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemSchema }      from 'src/schemas/item.schema';
import { ItemsService }    from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [
      MongooseModule.forFeature([
          {
              name:       'Item',
              schema:     ItemSchema,
              collection: 'items',
          },
      ]),
  ],
  controllers: [ItemsController],
  providers:   [ItemsService],
  exports:     [ItemsService],
})
export class ItemsModule {}