import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateTurnDto } from "./dto/create-turn.dto";
import { UpdateTurnDto } from "./dto/update-turn.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Turn } from "./entities/turn.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { LocationService } from "src/location/location.service";
import { TurnHistory } from "src/turn-history/entities/turn-history.entity";
import { validate as IsUUID } from "uuid";

@Injectable()
export class TurnService {
  constructor(
    @InjectRepository(Turn)
    private readonly turnRepository: Repository<Turn>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly locationService: LocationService,
    @InjectRepository(TurnHistory)
    private readonly turnHistoryRepository: Repository<TurnHistory>
  ) {}

  async create(createTurnDto: CreateTurnDto) {
    try {
      const { locationId, userId, turnNumber } = createTurnDto;

      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user)
        throw new NotFoundException("User not found , please create a user");

      const location = await this.locationService.findOne(locationId);
      if (!location)
        throw new NotFoundException(
          "Location not found , please insert a valid location"
        );

      const turn = this.turnRepository.create({
        turnNumber,
        createdAt: new Date(),
        user,
        location,
      });

      const savedTurn = await this.turnRepository.save(turn);

      const turnHistory = await this.turnHistoryRepository.save({
        turn: savedTurn,
        status: "requested",
        timestamp: new Date(),
      });

      savedTurn.turnHistory = turnHistory;

      const { turnHistory: _, ...turnWithoutHistory } = savedTurn;

      await this.turnRepository.save(savedTurn);

      return turnWithoutHistory;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return this.turnRepository.find();
  }

  async findOne(term: string) {
    let turn: Turn | null;

    if (IsUUID(term)) {
      turn = await this.turnRepository.findOneBy({ id: term });
      return turn;
    }

    throw new NotFoundException(`turn with ${term} not found`);
  }

  async update(id: string, updateTurnDto: UpdateTurnDto) {
    const updatedTurn = await this.turnRepository.preload({
      id,
      ...updateTurnDto,
    });

    if (!updatedTurn) {
      throw new NotFoundException(`Turn whit id ${id} not found in database`);
    }

    await this.turnRepository.save(updatedTurn);

    return updatedTurn;
  }

  async remove(id: string) {
    const turn = await this.turnRepository.findOne({
      where: { id },
      relations: ["user", "location", "turnHistory"],
    });

    const historyId = turn?.turnHistory.id;

    const turnHistory = await this.turnHistoryRepository.findOneBy({
      id: historyId,
    });

    const updateTurnHistory = await this.turnHistoryRepository.preload({
      id: historyId,
      ...turnHistory,
      status: "cancelled",
    });

    console.log(updateTurnHistory);

    await this.turnHistoryRepository.save(updateTurnHistory!);

    const { affected } = await this.turnRepository.delete({ id });
    if (affected === 0)
      throw new BadRequestException(
        `Not found location whit ${id} in the database`
      );

    return;
  }

  private handleErrors(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException("Unexpected error check the logs");
  }
}
