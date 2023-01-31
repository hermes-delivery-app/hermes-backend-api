import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsOptional()
    // @IsNotEmpty()
    readonly parent_id: string;

    @IsString()
    @IsOptional()
    // @IsNotEmpty()
    readonly restaurant_id: string;

    @IsBoolean()
    @ApiProperty()
    readonly isActive: boolean;
}