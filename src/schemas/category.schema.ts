import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { v4 as uuidv4 }                from 'uuid';

@Schema()
export class Category {

   @Prop({ type: String, default: function genUUID() {
      return uuidv4()
  }})
  _id: string;

   @Prop()
   name: string;

   @Prop()
   parent_id: string;

   @Prop()
   shop_id: string;

   @Prop()
   image: string;

   @Prop()
   isActive: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);