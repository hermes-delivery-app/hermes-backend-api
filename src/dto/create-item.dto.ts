import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
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
    @ApiProperty()
    readonly image: string;

    @ApiProperty()
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly category_id: string;

    @IsBoolean()
    @ApiProperty()
    readonly isActive: boolean;
}