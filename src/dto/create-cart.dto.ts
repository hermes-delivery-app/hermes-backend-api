import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ApiExtraModels()
export class AddItemDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
     item_id: string;
     
    @IsNumber()
    @Min(1)
    @ApiProperty()
     ammount: number;

     @IsNumber()
     @ApiProperty()
     price : number;
}

@ApiExtraModels()
export class RemoveItemDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
     item_id: string;
     
    @IsNumber()
    @Min(1)
    @ApiProperty()
     ammount: number;
}

export class CreateCartDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly user_id: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly shop_id: string;

    @IsOptional()
    @ApiProperty({
        type: AddItemDto,
        isArray: true,
      })  
      @ValidateNested({ each: true })
      @Type(() => AddItemDto)
      readonly items: AddItemDto[];

    @ApiProperty()
    readonly total: number;
}
