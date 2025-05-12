import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurnHistoryService } from './turn-history.service';
import { CreateTurnHistoryDto } from './dto/create-turn-history.dto';
import { UpdateTurnHistoryDto } from './dto/update-turn-history.dto';

@Controller('turn-history')
export class TurnHistoryController {
  constructor(private readonly turnHistoryService: TurnHistoryService) {}

  @Post()
  create(@Body() createTurnHistoryDto: CreateTurnHistoryDto) {
    return this.turnHistoryService.create(createTurnHistoryDto);
  }

  @Get()
  findAll() {
    return this.turnHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnHistoryDto: UpdateTurnHistoryDto) {
    return this.turnHistoryService.update(+id, updateTurnHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnHistoryService.remove(+id);
  }
}
