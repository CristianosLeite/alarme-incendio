import { Injectable, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  @Output() statusChanged: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();

  constructor(private websocketService: WebsocketService) {}

  emitStatus() {
    this.websocketService.connect('status');
    this.websocketService.getStatus('status').subscribe((status) => {
      this.statusChanged.emit(status);
    });
  }
}
