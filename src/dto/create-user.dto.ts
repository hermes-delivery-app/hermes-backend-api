import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, MinLength, IsString, MaxLength } from "class-validator";

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
    // @Validate(UniqueValidator, ['phoneNumber'], {
    //     message: 'phoneNumberAlreadyExists',
    //   })
    // @IsNotEmpty()
    //@Matches(/^\+[1-9]\d{1,14}$/)
    //^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$
    @ApiProperty()
    readonly phoneNumber: string;

    readonly isPhoneNumberConfirmed: boolean;

    readonly refreshToken: string;
}