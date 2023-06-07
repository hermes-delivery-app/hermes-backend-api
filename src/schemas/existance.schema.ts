import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

// Nested Schema
@Schema({_id: false})
export class Existance {
    
    @Prop({default: false})
    isArchived : boolean;
    
    @Prop()
    date: Date;

    @Prop({default: ""})
    cause: String;
}
export const ExistanceSchema = SchemaFactory.createForClass(Existance);