import { Injectable } from '@nestjs/common';
import { CreateTurnHistoryDto } from './dto/create-turn-history.dto';
import { UpdateTurnHistoryDto } from './dto/update-turn-history.dto';

@Injectable()
export class TurnHistoryService {
  create(createTurnHistoryDto: CreateTurnHistoryDto) {
    return 'This action adds a new turnHistory';
  }

  findAll() {
    return `This action returns all turnHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} turnHistory`;
  }

  update(id: number, updateTurnHistoryDto: UpdateTurnHistoryDto) {
    return `This action updates a #${id} turnHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} turnHistory`;
  }
}
