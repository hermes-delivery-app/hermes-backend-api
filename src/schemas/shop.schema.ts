import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { v4 as uuidv4 }                from 'uuid';

import { RatingDto, ScheduleDto } from "src/interface/shop.interface";
import { ExistanceSchema }        from "./existance.schema";
import { ExistanceDto }           from "src/interface/existance.interface";

// Nested Schema
@Schema({_id: false})
export class Schedule {
    
    @Prop()
    day : number;
    
    @Prop()
    opening_hours: string;

    @Prop()
    closing_hours: string;
}
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

// Nested Schema
@Schema({_id: false})
export class Rating {
    
    @Prop()
    positives : number;
    
    @Prop()
    negatives: number;
}
export const RatingSchema = SchemaFactory.createForClass(Rating);


@Schema()
export class Shop {

   @Prop({ type: String, default: function genUUID() {
      return uuidv4()
  }})
  _id: string;

   @Prop()
   name: string;

   @Prop()
   description: string;

   @Prop()
   adress: string;
   
   // Array example
   @Prop({ type: [ScheduleSchema], default: [] })
   schedule: ScheduleDto[];

   @Prop()
   image: string;

   // Single example
  @Prop({ type: RatingSchema })
  rating: RatingDto;

  // Single example
  @Prop({ type: ExistanceSchema })
  existance: ExistanceDto;
}
export const ShopSchema = SchemaFactory.createForClass(Shop);