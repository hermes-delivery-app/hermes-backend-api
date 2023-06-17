import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@ApiExtraModels()
export class CreateExistanceDto{
    @ApiProperty({default: false})
    isArchived: boolean;

    // @ApiProperty({default: new Date()})
    @ApiProperty()
    date: Date;

    @ApiProperty({default: ""})
    cause: string;
}