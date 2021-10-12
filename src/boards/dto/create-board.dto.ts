import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {

  @ApiProperty({
    example: 'board 1',
    description: 'board title',
    required: true
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'description 1',
    description: 'board description',
    required: true
  })
  @IsNotEmpty()
  description: string;
}