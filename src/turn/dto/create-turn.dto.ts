import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Min,
} from "class-validator";

export class CreateTurnDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  locationId: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  turnNumber: number;

  @IsOptional()
  @IsEnum(["normal", "priority"])
  priorityLevel: "normal" | "priority";

  @IsOptional()
  @IsEnum(["waiting", "called", "attended", "skipped", "cancelled"])
  status: "waiting" | "called" | "attended" | "skipped" | "cancelled";
}
