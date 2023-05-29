import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 }                from 'uuid';

@Schema()
export class User {

@Prop({ type: String, default: function genUUID() {
    return uuidv4()
}})
_id: string;

  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;

  // @Prop({default:false})
  // isPhoneNumberConfirmed: boolean;

 @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);