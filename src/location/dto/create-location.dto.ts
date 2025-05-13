import { IsOptional, IsString, MinLength } from "class-validator";
export class CreateLocationDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(10)
  address: string;
}
