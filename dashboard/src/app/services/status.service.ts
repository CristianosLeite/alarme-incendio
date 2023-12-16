import { Injectable, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() alarmesChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deviceChanged: EventEmitter<{
    device: string;
    status: boolean;
  }> = new EventEmitter<{ device: string; status: boolean }>();

  constructor(private websocketService: WebsocketService) {}

  emitStatus(route: string) {
    this.websocketService.connect(route);
    this.emitEvent(route);
  }

  private emitEvent(route: string) {
    switch (route) {
      case 'status':
        this.websocketService.getStatus(route).subscribe((status) => {
          this.statusChanged.emit(status);
        });
        break;
      case 'alarmes':
        this.websocketService.getStatus(route).subscribe((status) => {
          this.alarmesChanged.emit(status);
        });
        break;
      default:
        this.websocketService.getdevice(route).subscribe((data) => {
          this.deviceChanged.emit(JSON.parse(String(data)));
        });
        break;
    }
  }

  closeConnection(route: string) {
    this.websocketService.closeConnection(route);
  }
}
