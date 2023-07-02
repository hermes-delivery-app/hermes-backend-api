import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, MinLength, IsString, MaxLength, Matches, ValidateNested, IsOptional} from "class-validator";

import { CreateExistanceDto } from "./create-existance.dto";
import { Type }               from "class-transformer";

export class CreateCourierDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?3?8?(0\d{2}\d{3}\d{2}\d{2})$/)
    @ApiProperty()
    readonly phoneNumber: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly portrait: string;

    @ApiProperty({
        type: CreateExistanceDto,
        isArray: false,
      })  
    @ValidateNested({ each: true })
    @Type(() => CreateExistanceDto)
      readonly existance: CreateExistanceDto; 
}