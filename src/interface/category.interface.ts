import { Document } from 'mongoose';

export interface ICategory extends Document{
    readonly name: string;
    readonly parent_id: string;
    readonly restaurant_id: string;
    readonly isActive: boolean;
}
