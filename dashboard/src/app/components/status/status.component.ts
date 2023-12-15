import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgIf],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

  @Input() status: boolean | null = false;
  @Input() device: string = 'setor desconhecido';

  constructor(private statusService: StatusService) {
    this.statusService.statusChanged.subscribe((status) => {
      this.status = status;
    });
  }
}
