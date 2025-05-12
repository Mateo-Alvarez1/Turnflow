import { Module } from "@nestjs/common";
import { TurnHistoryService } from "./turn-history.service";
import { TurnHistoryController } from "./turn-history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TurnHistory } from "./entities/turn-history.entity";

@Module({
  controllers: [TurnHistoryController],
  providers: [TurnHistoryService],
  imports: [TypeOrmModule.forFeature([TurnHistory])],
})
export class TurnHistoryModule {}
