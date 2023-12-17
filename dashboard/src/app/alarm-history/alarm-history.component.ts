import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-alarm-history',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './alarm-history.component.html',
  styleUrl: './alarm-history.component.scss'
})

export class AlarmHistoryComponent {
  isLoading: boolean = true;
  records: any[] = [
    {
      id: 1,
      location: 'Setor G1',
      recognizes: 'false',
      eventDate: '17-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    }
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
