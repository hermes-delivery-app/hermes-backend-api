import { Document } from 'mongoose';
import { ExistanceDto } from './existance.interface';

export interface ScheduleDto {
    readonly day           : number;
    readonly opening_hours : string;
    readonly closing_hours : string;
}

export interface RatingDto {
    positives : number;
    negatives : number;
    rate      : number;
}

export interface IShop extends Document{
    readonly name         : string;
    readonly description  : string;
    readonly adress       : string;
    readonly deliveryTime : string;
    readonly deliveryCost : number;
    readonly schedule     : ScheduleDto;
    readonly image        : string;
    readonly rating       : RatingDto;
    readonly existance    : ExistanceDto;
}
