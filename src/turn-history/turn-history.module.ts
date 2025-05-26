import { Module } from "@nestjs/common";
import { TurnHistoryService } from "./turn-history.service";
import { TurnHistoryController } from "./turn-history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TurnHistory } from "./entities/turn-history.entity";
import { TurnService } from "src/turn/turn.service";
import { AuthModule } from "src/user/auth.module";

@Module({
  controllers: [TurnHistoryController],
  providers: [TurnHistoryService],
  imports: [TypeOrmModule.forFeature([TurnHistory]), AuthModule],
  exports: [TypeOrmModule],
})
export class TurnHistoryModule {}
