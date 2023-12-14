import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private sockets: { [key: string]: WebSocket } = {};

  connect(route: string) {
    if (!this.sockets[route]) {
      this.sockets[route] = new WebSocket(`ws://192.168.10.03:1880/ws/${route}`);
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
}