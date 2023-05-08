import { Document } from 'mongoose';

export interface IUser extends Document{
    readonly name: string;
    readonly password: string;
    readonly phoneNumber: string;
    readonly isPhoneNumberConfirmed: boolean;
    readonly refreshToken: string;
}
