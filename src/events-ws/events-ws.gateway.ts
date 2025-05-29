import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { EventsWsService } from "./events-ws.service";
import { Socket } from "socket.io";
import { Server } from "http";

@WebSocketGateway({ cors: true })
export class EventsWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(private readonly eventsWsService: EventsWsService) {}

  handleConnection(client: Socket) {
    // console.log("Client Connected", client.id);
    this.eventsWsService.registerClient(client);
    this.wss.emit("client-updated", this.eventsWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    // console.log("Client Disconnect", client.id);
    this.eventsWsService.removeClient(client.id);
    this.wss.emit("client-updated", this.eventsWsService.getConnectedClients());
  }
}
