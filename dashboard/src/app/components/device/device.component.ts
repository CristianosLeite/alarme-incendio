import { Component, Input, OnChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { WebsocketService } from '../../services/websocket.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [NgIf],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent implements OnChanges {

  subject: Subject<string> = new Subject<string>();
  statusSubscription = new Subscription();

  @Input() device: string = 'none';
  @Input() title: string = 'Desconhecido';
  @Input() status: boolean = false;
  @Input() imgPath: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnChanges() {
    this.subject.next(this.device);
    this.websocketService.connect(this.device);
    this.subscribeToStatus();
  }

  ngOnDestroy() {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  private subscribeToStatus() {
    this.statusSubscription = this.websocketService.getStatus(this.device).subscribe((status) => {
      this.status = status;
    });
  }
}
