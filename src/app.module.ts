import { Module } from "@nestjs/common";
import { AuthModule } from "./user/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { TurnModule } from "./turn/turn.module";
import { LocationModule } from "./location/location.module";
import { TurnHistoryModule } from "./turn-history/turn-history.module";
import { EventsWsModule } from "./events-ws/events-ws.module";
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DB_URL,
      autoLoadEntities: true, // detecta las entidades automaticamente
      synchronize: true, // sincroniza nuestras entidades con la DB al inciar el programa
    }),
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TurnModule,
    LocationModule,
    TurnHistoryModule,
    EventsWsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
