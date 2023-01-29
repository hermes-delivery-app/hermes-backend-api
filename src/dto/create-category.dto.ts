import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    // @IsNotEmpty()
    readonly parent_id: string;

    @IsString()
    // @IsNotEmpty()
    readonly restaurant_id: string;

    readonly isActive: boolean;
}