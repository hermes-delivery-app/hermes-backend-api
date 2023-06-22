import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { v4 as uuidv4 }                from 'uuid';

// // Nested Schema
@Schema({_id:false})
export class Items {
    @Prop()
    item_id: string;

    @Prop()
    ammount: number;

    @Prop()
    price: number;

    @Prop()
    total: number; 
}
export const ItemsSchema = SchemaFactory.createForClass(Items);
export type ItemDocument = Items & Document;

@Schema()
export class Cart {

   @Prop({ type: String, default: function genUUID() {
      return uuidv4()
  }})
  _id: string;

   @Prop()
   user_id: string;

   @Prop()
   shop_id: string;
   
   @Prop({ type: [ItemsSchema], default: [] })
   items: Items[];

   @Prop()
   total: number;
}
export const CartSchema = SchemaFactory.createForClass(Cart);
export type CartDocument = Cart & Document;

