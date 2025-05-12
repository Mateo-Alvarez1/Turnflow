import { IsOptional, IsString, MinLength } from "class-validator";
import { Turn } from "src/turn/entities/turn.entity";

export class CreateLocationDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(10)
  address: string;
}
