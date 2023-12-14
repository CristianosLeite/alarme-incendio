import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private sockets: { [key: string]: WebSocket } = {};

  constructor() {
    this.connect('portaria')
    this.connect('g1');
    this.connect('g2');
    this.connect('transporte');
    this.connect('adm');
    this.connect('residuos');
  }

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

  getStatus(route: string): Observable<boolean> {
    let subject = new Subject<boolean>();

    if (this.sockets[route]) {
      this.sockets[route].onmessage = (event) => subject.next(event.data);
      this.sockets[route].onerror = (event) => subject.error(event);
      this.sockets[route].onclose = () => subject.complete();
    }

    return subject.asObservable();
  }
}