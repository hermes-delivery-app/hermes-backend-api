import { ApiProperty } from "@nestjs/swagger";


export class AuthDto {
    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    password: string;
}