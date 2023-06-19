import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from "class-validator";

import { CreateExistanceDto } from "./create-existance.dto";

@ApiExtraModels()
export class CreateScheduleDto{
    @IsNumber()
    @Min(1)
    @Max(7)
    @Type(() => Number)
    @ApiProperty({default: 1})
    day: number;

    @ApiProperty({default: "9:00"})
    opening_hours: string;

    @ApiProperty({default: "22:00"})
    closing_hours: string;
}

@ApiExtraModels()
export class CreateRatingDto{
    @IsNumber()
    @ApiProperty()
    positives: number;

    @IsNumber()
    @ApiProperty()
    negatives: number;

    @ApiProperty()
    rate : number;
}

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    @ApiProperty()
    readonly name: string;

    @IsOptional()
    @IsString()
    // @MaxLength(60)
    @ApiProperty()
    readonly description: string;

    @IsOptional()
    @IsString()
    // @MaxLength(60)
    @ApiProperty()
    readonly adress: string;

    @IsOptional()
    @IsString()
    // @MaxLength(60)
    @ApiProperty()
    readonly deliveryTime: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    readonly deliveryCost: number;

    @IsOptional()
    @ApiProperty({
        type: CreateScheduleDto,
        isArray: true,
      })  
      @ValidateNested({ each: true })
      @Type(() => CreateScheduleDto)
      readonly schedule: CreateScheduleDto[];

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly image: string;

    @ApiProperty({
        type: CreateRatingDto,
        isArray: false,
      })  
      @ValidateNested({ each: true })
      @Type(() => CreateRatingDto)
      readonly rating: CreateRatingDto;

    @ApiProperty({
        type: CreateExistanceDto,
        isArray: false,
      })  
    @ValidateNested({ each: true })
    @Type(() => CreateExistanceDto)
      readonly existance: CreateExistanceDto; 
}
