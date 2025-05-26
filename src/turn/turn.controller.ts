import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TurnService } from "./turn.service";
import { CreateTurnDto } from "./dto/create-turn.dto";
import { UpdateTurnDto } from "./dto/update-turn.dto";
import { CreateTurnHistoryDto } from "src/turn-history/dto/create-turn-history.dto";
import { GetUser } from "src/user/decorators/get-user.decorator";
import { User } from "src/user/entities/user.entity";
import { Auth } from "src/user/decorators/auth.decorator";
import { ValidRoles } from "src/user/interfaces/valid-roles";

@Controller("")
export class TurnController {
  constructor(private readonly turnService: TurnService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(
    @Body()
    body: {
      createTurnDto: CreateTurnDto;
      createTurnHistoryDto: CreateTurnHistoryDto;
    },
    @GetUser() user: User
  ) {
    return this.turnService.create(user, body);
  }

  @Get()
  findAll() {
    return this.turnService.findAll();
  }

  @Get(":term")
  findOne(@Param("term") term: string) {
    return this.turnService.findOne(term);
  }

  @Patch(":id")
  @Auth(ValidRoles.admin)
  update(@Param("id") id: string, @Body() updateTurnDto: UpdateTurnDto) {
    return this.turnService.update(id, updateTurnDto);
  }

  @Delete(":id")
  @Auth(ValidRoles.admin)
  remove(@Param("id") id: string) {
    return this.turnService.remove(id);
  }
}
