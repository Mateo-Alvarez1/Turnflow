import { Module } from "@nestjs/common";
import { TurnService } from "./turn.service";
import { TurnController } from "./turn.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Turn } from "./entities/turn.entity";
import { AuthModule } from "src/user/auth.module";
import { LocationModule } from "src/location/location.module";
import { TurnHistory } from "src/turn-history/entities/turn-history.entity";
import { TurnHistoryModule } from "src/turn-history/turn-history.module";
import { TurnHistoryService } from "src/turn-history/turn-history.service";

@Module({
  controllers: [TurnController],
  providers: [TurnService, TurnHistoryService],
  imports: [
    TypeOrmModule.forFeature([Turn]),
    AuthModule,
    LocationModule,
    TurnHistoryModule,
  ],
})
export class TurnModule {}
