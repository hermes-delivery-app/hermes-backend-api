import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Category {
   @Prop()
   name: string;

   @Prop()
   parent_id: string;

   @Prop()
   restaurant_id: string;

   @Prop()
   isActive: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);