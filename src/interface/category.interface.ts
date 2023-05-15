import { Document } from 'mongoose';

export interface ICategory extends Document{
    readonly name      : string;
    readonly parent_id : string;
    readonly shop_id   : string;
    readonly isActive  : boolean;
}
