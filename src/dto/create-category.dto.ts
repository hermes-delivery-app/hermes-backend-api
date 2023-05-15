import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    @ApiProperty()
    readonly name: string;

    @IsOptional()
    @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    readonly parent_id: string;


    @IsOptional()
    @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    readonly shop_id: string;

    @IsBoolean()
    @ApiProperty()
    readonly isActive: boolean;
}