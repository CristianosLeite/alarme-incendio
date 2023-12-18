import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  wsServer = 'ws://192.168.10.3:1880/ws/';

  constructor() {
    if (isDevMode()) {
      this.wsServer = 'ws://localhost:1880/ws/';
    }
  }

  private sockets: { [key: string]: WebSocket } = {};

  connect(route: string) {
    if (!this.sockets[route]) {
      this.sockets[route] = new WebSocket(this.wsServer + route);
    }
  }

  sendMessage(route: string, message: string) {
    if (this.sockets[route]) {
      this.sockets[route].send(message);
    }
  }

  closeConnection(route: string) {
    if (this.sockets[route]) {
      this.sockets[route].close();
      delete this.sockets[route];
    }
  }

  getStatus(route: string) {
    return new Observable<boolean>((observer) => {
      if (this.sockets[route]) {
        this.sockets[route].onmessage = (event) => {
          observer.next(event.data === 'true');
        };
      }
    });
  }

  getdevice(route: string) {
    return new Observable<{ device: string; status: boolean }>((observer) => {
      if (this.sockets[route]) {
        this.sockets[route].onmessage = (event) => {
          observer.next(event.data);
        };
      }
    });
  }
}
