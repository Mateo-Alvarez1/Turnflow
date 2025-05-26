import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateTurnHistoryDto {
  @IsEnum([
    "requested",
    "waiting",
    "called",
    "attended",
    "skipped",
    "cancelled",
  ])
  status: string;

  @IsString()
  @IsOptional()
  changedByUserId: string;
}
