import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, MinLength, IsString, MaxLength, Matches} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @ApiProperty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?3?8?(0\d{2}\d{3}\d{2}\d{2})$/)
    @ApiProperty()
    readonly phoneNumber: string;

    readonly isPhoneNumberConfirmed: boolean;

    readonly refreshToken: string;
}