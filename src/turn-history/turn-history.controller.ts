import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TurnHistoryService } from "./turn-history.service";
import { CreateTurnHistoryDto } from "./dto/create-turn-history.dto";
import { UpdateTurnHistoryDto } from "./dto/update-turn-history.dto";
import { Auth } from "src/user/decorators/auth.decorator";
import { ValidRoles } from "src/user/interfaces/valid-roles";
import { GetUser } from "src/user/decorators/get-user.decorator";
import { User } from "src/user/entities/user.entity";

@Controller("turn-history")
export class TurnHistoryController {
  constructor(private readonly turnHistoryService: TurnHistoryService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createTurnHistoryDto: CreateTurnHistoryDto) {
    return this.turnHistoryService.create(createTurnHistoryDto);
  }

  @Patch(":id")
  @Auth(ValidRoles.admin)
  update(
    @Param("id") id: string,
    @Body() updateTurnHistoryDto: UpdateTurnHistoryDto
  ) {
    return this.turnHistoryService.update(id, updateTurnHistoryDto);
  }

  @Delete(":id")
  @Auth(ValidRoles.admin)
  remove(@Param("id") id: string) {
    return this.turnHistoryService.remove(id);
  }
}
