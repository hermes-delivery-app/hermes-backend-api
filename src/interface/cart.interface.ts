import { Document } from 'mongoose';

export interface ItemDto {
    readonly item_id : string;
    readonly ammount : number;
}

export interface ICart extends Document{
    readonly user_id  : string;
    readonly shop_id  : string;
    readonly items    : ItemDto;
    readonly total    : number;
}