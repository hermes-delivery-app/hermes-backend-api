import { Document } from 'mongoose';

import { ExistanceDto } from './existance.interface';

export interface IUser extends Document{
    readonly name                   : string;
    readonly phoneNumber            : string;
    readonly password               : string;
  //  readonly isPhoneNumberConfirmed : boolean;
    readonly refreshToken           : string;
    readonly existance   : ExistanceDto;
}
