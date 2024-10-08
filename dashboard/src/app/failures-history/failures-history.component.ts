import { Component, OnInit } from '@angular/core';
import { FilterTagsComponent } from '../components/filter-tags/filter-tags.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Falha } from '../interfaces/failure.interface';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-failures-history',
  standalone: true,
  imports: [
    FilterTagsComponent,
    NgIf,
    NgFor,
    DatePipe
  ],
  templateUrl: './failures-history.component.html',
  styleUrl: './failures-history.component.scss'
})
export class FailuresHistoryComponent implements OnInit {
  failures: Falha[] = [];
  tags: string[] = [];

  constructor(private databaseService: DatabaseService) {
    this.databaseService.FailuresLoaded.subscribe((failures: Falha[]) => {
      this.failures = failures;
    });
  }

  ngOnInit(): void {
    this.databaseService.getFailures();
    this.failures = this.databaseService.failures;
  }

  onTagsChanged(tags: string[]) {
    this.tags = tags;
    this.databaseService.filterFailures(tags);
  }
}
