import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgIf],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit, OnDestroy {

  @Input() status: boolean = false;
  @Input()isActive: boolean = false;

  @Input() device: string = 'setor desconhecido';

  constructor(private statusService: StatusService) {
    this.statusService.statusChanged.subscribe((status) => {
      this.status = status;
    });
    this.statusService.alarmesChanged.subscribe((status) => {
      this.isActive = status;
    });
    this.statusService.deviceChanged.subscribe((device) => {
      this.device = device.device;
    });
  }
  
  ngOnInit(): void {
    this.statusService.emitStatus('status');
    this.statusService.emitStatus('alarmes');
    this.statusService.emitStatus('acionadores');
  }

  ngOnDestroy() {
    this.statusService.closeConnection('status');
    this.statusService.closeConnection('alarmes');
    this.statusService.closeConnection('acionadores');
    this.statusService.statusChanged.unsubscribe();
    this.statusService.alarmesChanged.unsubscribe();
    this.statusService.deviceChanged.unsubscribe();
  }
}
