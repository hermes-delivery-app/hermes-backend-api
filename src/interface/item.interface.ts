import { Document } from 'mongoose';

export interface IItem extends Document{
    readonly name          : string;
    readonly description   : string;
    readonly image         : string;
    readonly price         : number;
    readonly ammount       : number;
    readonly category_id   : string;
    readonly isActive      : boolean;
}