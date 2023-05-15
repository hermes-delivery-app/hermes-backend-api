import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { v4 as uuidv4 }                from 'uuid';

@Schema()
export class Item {

   @Prop({ type: String, default: function genUUID() {
      return uuidv4()
  }})
  _id: string;

   @Prop()
   name: string;

   @Prop()
   description: string;

   @Prop()
   image: string;

   @Prop()
   price: number;

   @Prop()
   ammount: number;

   @Prop()
   category_id: string;

   @Prop()
   isActive: boolean;
}
export const ItemSchema = SchemaFactory.createForClass(Item);