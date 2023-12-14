import { Component, Input, OnChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [NgIf],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent implements OnChanges {
  @Input() device: string = 'none';
  @Input() title: string = 'Desconhecido';
  @Input() status: boolean = false;
  @Input() imgPath: string = '';

  constructor(private websocketService: WebsocketService) {}
  
  ngOnChanges() {
    this.websocketService.getStatus(this.device).subscribe((status) => {
      this.status = status;
    });
  }
}
