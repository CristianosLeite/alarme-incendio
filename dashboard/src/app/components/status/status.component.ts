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

  status: boolean | null = false;
  @Input() device: string = 'setor desconhecido';

  constructor(private statusService: StatusService) {
    this.statusService.statusChanged.subscribe((status) => {
      this.status = status;
    });
  }
  
  ngOnInit(): void {
    this.statusService.emitStatus();
  }

  ngOnDestroy() {
    this.statusService.statusChanged.unsubscribe();
  }
}
