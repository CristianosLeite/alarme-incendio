import { Injectable, Output, EventEmitter, isDevMode } from '@angular/core';
import { Evento } from '../interfaces/record.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Falha } from '../interfaces/failure.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  @Output() RecordsLoaded = new EventEmitter<Evento[]>();
  @Output() FailuresLoaded = new EventEmitter<Falha[]>();
  records: Evento[] = [];
  failures: Falha[] = [];
  recordsUrl = 'http://192.168.10.3:1880/records/all';
  failuresUrl = 'http://192.168.10.3:1880/failures/all';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.recordsUrl = 'http://localhost:1880/records/all';
      this.failuresUrl = 'http://localhost:1880/failures/all';
    }
  }

  filterData(tags: string[], data: any[], dataLoaded: EventEmitter<any[]>, fields: string[]) {
    let filteredValues = [...data];
  
    if (tags.length > 0) {
      const list = tags.map((tag) => tag.toLowerCase().trim());
  
      filteredValues = data.filter((item) => {
        return fields.some((field) => 
          list.some((tag) => item[field].toString().toLowerCase().includes(tag))
        );
      });
    }
  
    dataLoaded.emit(filteredValues);
    return filteredValues;
  }

  filterRecords(tags: string[]) {
    return this.filterData(tags, this.records, this.RecordsLoaded, ['evento_id', 'setor', 'local_acionamento', 'reconhece', 'data_evento']);
  }

  filterFailures(tags: string[]) {
    return this.filterData(tags, this.failures, this.FailuresLoaded, ['falha_id', 'dispositivo', 'data_falha']);
  }

  async fetchData(url: string, dataLoaded: EventEmitter<any[]>, data: any) {
    await lastValueFrom(this.http.get(url, { responseType: 'json' })).then(
      (response) => {
        data = response;
        dataLoaded.emit(data);
      }
    );
  }

  async getRecords(): Promise<void> {
    await this.fetchData(this.recordsUrl, this.RecordsLoaded, this.records);
  }

  async getFailures(): Promise<void> {
    await this.fetchData(this.failuresUrl, this.FailuresLoaded, this.failures);
  }
}
