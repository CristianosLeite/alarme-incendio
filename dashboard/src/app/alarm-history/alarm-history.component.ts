import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FilterTagsComponent } from '../components/filter-tags/filter-tags.component';
import { RecordsService } from '../services/records.service';
import { Record } from '../interfaces/record.interface';

@Component({
  selector: 'app-alarm-history',
  standalone: true,
  imports: [NgIf, NgFor, FilterTagsComponent],
  templateUrl: './alarm-history.component.html',
  styleUrl: './alarm-history.component.scss'
})

export class AlarmHistoryComponent implements OnInit {
  isLoading: boolean = true;
  records: Record[] = [];

  tags: string[] = [];

  constructor(private recordsService: RecordsService) {
    this.recordsService.RecordsLoaded.subscribe((records: Record[]) => {
      this.records = records;
    });
  }

  ngOnInit() {
    this.records = this.recordsService.records;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  onTagsChanged(tags: string[]) {
    this.tags = tags;
    this.recordsService.filterRecords(tags);
  }
}
