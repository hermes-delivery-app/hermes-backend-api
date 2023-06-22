import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 }                from 'uuid';

import { ExistanceSchema } from './existance.schema';
import { ExistanceDto }   from 'src/interface/existance.interface';

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

 @Prop()
  refreshToken: string;

  @Prop({default:false})
  isArchived: boolean;

   // Single example
  //  @Prop({ type: ExistanceSchema })
  //  existance: ExistanceDto;
}

export const UserSchema = SchemaFactory.createForClass(User);