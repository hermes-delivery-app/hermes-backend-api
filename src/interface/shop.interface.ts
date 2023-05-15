import { Document } from 'mongoose';
import { ExistanceDto } from './existance.interface';

export interface ScheduleDto {
    readonly day           : number;
    readonly opening_hours : string;
    readonly closing_hours : string;
}

export interface RatingDto {
    readonly positives : number;
    readonly negatives : number;
}

export interface IShop extends Document{
    readonly name        : string;
    readonly description : string;
    readonly adress      : string;
    readonly schedule    : ScheduleDto;
    readonly image       : string;
    readonly rating      : RatingDto;
    readonly existance   : ExistanceDto;
}
