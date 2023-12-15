import { Component, Input, OnChanges } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgIf } from '@angular/common';
import { WebsocketService } from '../../services/websocket.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [NgIf, NgOptimizedImage],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent implements OnChanges {

  subject: Subject<string> = new Subject<string>();
  statusSubscription = new Subscription();

  @Input() device: string = 'none';
  @Input() title: string = 'Desconhecido';
  @Input() status: boolean | null = false;
  @Input() imgPath: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnChanges() {
    this.websocketService.connect(this.device);
    this.subject.next(this.device);
    this.subscribeToStatus();
  }

  ngOnDestroy() {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
      this.websocketService.closeConnection(this.device);
    }
  }

  private subscribeToStatus() {
    this.statusSubscription = this.websocketService.getStatus(this.device).subscribe((status) => {
      this.status = status;
    });
  }
}
