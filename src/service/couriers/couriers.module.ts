import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CourierSchema }      from 'src/schemas/courier.schema';
import { CouriersService }    from './couriers.service';
import { CouriersController } from './couriers.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Courier',
                schema: CourierSchema,
                collection: 'couriers',
            },
        ]),
    ],
    controllers: [CouriersController],
    providers:   [CouriersService],
    exports:     [CouriersService],
})
export class CouriersModule { }