import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTurnHistoryDto } from "./dto/create-turn-history.dto";
import { UpdateTurnHistoryDto } from "./dto/update-turn-history.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TurnHistory } from "./entities/turn-history.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class TurnHistoryService {
  constructor(
    @InjectRepository(TurnHistory)
    private readonly turnHistoryRepository: Repository<TurnHistory>
  ) {}

  async create(createTurnHistoryDto: CreateTurnHistoryDto) {
    try {
      const { changedByUserId } = createTurnHistoryDto;

      const turnHistory = this.turnHistoryRepository.create({
        ...createTurnHistoryDto,
        changedByUserId: changedByUserId,
      });

      return await this.turnHistoryRepository.save(turnHistory);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.turnHistoryRepository.find();
  }

  async update(id: string, updateTurnHistoryDto: UpdateTurnHistoryDto) {
    const { status } = updateTurnHistoryDto;

    const updatedTurn = await this.turnHistoryRepository.preload({
      id,
      status,
      ...updateTurnHistoryDto,
    });

    if (!updatedTurn) {
      throw new NotFoundException(
        `TurnHistory whit id ${id} not found in database`
      );
    }

    await this.turnHistoryRepository.save(updatedTurn);

    return updatedTurn;
  }

  async remove(id: string) {
    const { affected } = await this.turnHistoryRepository.delete(id);
    if (affected === 0)
      throw new BadRequestException(
        `Not found turnHistory whit ${id} in the database`
      );

    return;
  }
}
