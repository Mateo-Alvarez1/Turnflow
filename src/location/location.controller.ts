import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { LocationService } from "./location.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Auth } from "src/user/decorators/auth.decorator";
import { ValidRoles } from "src/user/interfaces/valid-roles";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get("all")
  @Auth(ValidRoles.admin)
  findAll() {
    return this.locationService.findAll();
  }

  @Get(":term")
  @Auth(ValidRoles.admin)
  findOne(@Param("term") term: string) {
    return this.locationService.findOne(term);
  }

  @Patch(":id")
  @Auth(ValidRoles.admin)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateLocationDto: UpdateLocationDto
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(":id")
  @Auth(ValidRoles.admin)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.locationService.remove(id);
  }
}
