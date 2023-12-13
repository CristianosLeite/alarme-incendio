import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgIf],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

  @Input() status: string = 'success';
  @Input() device: string = 'setor desconhecido';

}
