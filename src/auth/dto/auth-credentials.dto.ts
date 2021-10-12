import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

  @ApiProperty({
    example: 'abcd',
    description: 'user name',
    required: true
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    example: 'abcd123',
    description: 'password',
    required: true
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number'
  })
  password: string;
}