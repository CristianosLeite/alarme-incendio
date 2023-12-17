import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FilterTagsComponent } from '../components/filter-tags/filter-tags.component';
import { DatabaseService } from '../services/database.service';
import { Evento } from '../interfaces/record.interface';

@Component({
  selector: 'app-alarm-history',
  standalone: true,
  imports: [NgIf, NgFor, FilterTagsComponent, DatePipe],
  templateUrl: './alarm-history.component.html',
  styleUrl: './alarm-history.component.scss',
})
export class AlarmHistoryComponent implements OnInit {
  records: Evento[] = [];

  tags: string[] = [];

  constructor(private databaseService: DatabaseService) {
    this.databaseService.RecordsLoaded.subscribe((records: Evento[]) => {
      this.records = records;
    });
  }

  ngOnInit() {
    this.databaseService.getRecords();
    this.records = this.databaseService.records;
  }

  onTagsChanged(tags: string[]) {
    this.tags = tags;
    this.databaseService.filterRecords(tags);
  }
}
