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

  filterRecords(tags: string[]): Evento[] {
    const filteredValues = this.filterList(tags, this.records, (record) => [
      record.evento_id.toString(),
      record.setor,
      record.local_acionamento,
      record.reconhece.toString(),
      new Date(record.data_evento)
        .toLocaleDateString('pt-BR')
        .replace(/\//g, '-'),
    ]);

    this.RecordsLoaded.emit(filteredValues);
    return filteredValues;
  }

  filterFailures(tags: string[]): Falha[] {
    const filteredValues = this.filterList(tags, this.failures, (failure) => [
      failure.falha_id.toString(),
      failure.dispositivo,
      new Date(failure.data_falha)
        .toLocaleDateString('pt-BR')
        .replace(/\//g, '-'),
    ]);

    this.FailuresLoaded.emit(filteredValues);
    return filteredValues;
  }

  private filterList<T>(
    tags: string[],
    list: T[],
    getPropertyValues: (item: T) => string[]
  ): T[] {
    if (tags.length === 0) {
      return list;
    }

    const normalizedTags = tags.map((tag) => tag.toLowerCase().trim());

    return list.filter((item) =>
      getPropertyValues(item).some((value) =>
        normalizedTags.includes(value.toLowerCase())
      )
    );
  }

  async getRecords(): Promise<void> {
    const records = await this.fetchData<Evento>(this.recordsUrl);
    this.records = records;
    this.RecordsLoaded.emit(this.records);
  }

  async getFailures(): Promise<void> {
    const failures = await this.fetchData<Falha>(this.failuresUrl);
    this.failures = failures;
    this.FailuresLoaded.emit(this.failures);
  }

  private async fetchData<T>(url: string): Promise<T[]> {
    const response = await lastValueFrom(
      this.http.get(url, { responseType: 'json' })
    );
    return response as T[];
  }
}
