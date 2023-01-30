import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    // @IsString()
    // // @IsNotEmpty()
    // readonly parent_id: string;

    // @IsString()
    // // @IsNotEmpty()
    // readonly restaurant_id: string;

    @ApiProperty()
    readonly isActive: boolean;
}