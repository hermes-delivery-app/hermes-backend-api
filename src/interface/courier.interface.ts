import { Document } from 'mongoose';

import { ExistanceDto } from './existance.interface';

export interface ICourier extends Document{
    readonly name                   : string;
    readonly phoneNumber            : string;
    readonly portrait               : string;
    readonly existance              : ExistanceDto;
}
