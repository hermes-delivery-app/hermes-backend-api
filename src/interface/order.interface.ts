import { Document } from 'mongoose';

export interface IOrder extends Document {
    readonly cart_id    : string;
             total      : number;
    readonly date       : Date;
    readonly courier_id : string;
    readonly status     : string;
    readonly feedback   : boolean;
}
