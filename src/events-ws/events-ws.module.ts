import { Module } from '@nestjs/common';
import { EventsWsService } from './events-ws.service';
import { EventsWsGateway } from './events-ws.gateway';

@Module({
  providers: [EventsWsGateway, EventsWsService],
})
export class EventsWsModule {}
