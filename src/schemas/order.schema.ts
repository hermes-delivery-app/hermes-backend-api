import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

// enum Status {
//     STATUS_1 = 'ORDERED',
//     STATUS_2 = 'IN PROGRESS',
//     STATUS_3 = 'DELIVERED',
//     STATUS_4 = 'CANCELED',
// }

@Schema()
export class Order {

    @Prop({
        type: String, default: function genUUID() {
            return uuidv4()
        }
    })
    _id: string;

    @Prop()
    cart_id: string;

    @Prop()
    total: number;

    @Prop()
    date: Date;

    @Prop()
    courier_id: string;

    @Prop()
    status: string;

    @Prop()
    feedback: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);