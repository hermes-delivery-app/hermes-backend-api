import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

// Nested Schema
@Schema({_id: false})
export class Existance {
    
    @Prop()
    isArchived : boolean;
    
    @Prop()
    date: Date;

    @Prop()
    cause: String;
}
export const ExistanceSchema = SchemaFactory.createForClass(Existance);