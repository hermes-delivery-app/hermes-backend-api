import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, MinLength, IsString, MaxLength, Matches, ValidateNested, IsOptional, IsNumber} from "class-validator";

import { CreateExistanceDto } from "./create-existance.dto";
import { Type }               from "class-transformer";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    cart_id: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    total: number;

    @ApiProperty({ default: new Date() })
    date: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    courier_id: string;

    @IsString()
    @ApiProperty({default: 'ORDERED'})
    status: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    feedback:boolean;
}