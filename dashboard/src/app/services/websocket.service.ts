import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private sockets: { [key: string]: WebSocket } = {};

  constructor() {}

  connect(route: string) {
    if (!this.sockets[route]) {
      this.sockets[route] = new WebSocket(
        `ws://localhost:1880/ws/${route}`
      );
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

  getStatus(route: string): Observable<boolean> {
    if (this.sockets[route]) {
      return new Observable((observer) => {
        this.sockets[route].onmessage = (event) => observer.next(event.data);
        this.sockets[route].onerror = (event) => observer.error(event);
        this.sockets[route].onclose = () => observer.complete();
      });
    }

    return new Observable((observer) => {
      observer.error('No socket connection.');
    });
  }
}
