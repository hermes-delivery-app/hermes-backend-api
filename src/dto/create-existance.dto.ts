import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@ApiExtraModels()
export class CreateExistanceDto{
    @ApiProperty({default: false})
    isArchived: boolean;

    @ApiProperty()
    date: Date;

    @ApiProperty({default: ""})
    cause: string;
}