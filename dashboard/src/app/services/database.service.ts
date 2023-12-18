import { Injectable, Output, EventEmitter, isDevMode } from '@angular/core';
import { Evento } from '../interfaces/record.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  @Output() RecordsLoaded = new EventEmitter<Evento[]>();
  @Output() FailuresLoaded = new EventEmitter<Evento[]>();
  records: Evento[] = [];
  recordsUrl = 'http://192.168.10.3:1880/records/all';
  failuresUrl = 'http://192.168.10.3:1880/failures/all';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.recordsUrl = 'http://localhost:1880/records/all';
      this.failuresUrl = 'http://localhost:1880/failures/all';
    }
  }

  filterRecords(tags: string[]) {
    if (tags.length === 0) {
      this.RecordsLoaded.emit(this.records);
      return this.records;
    }

    const list = tags.map((tag) => tag.toLowerCase().trim());

    const filteredValues = this.records.filter((record: Evento) => {
      return (
        list.some((id) => id === record.evento_id.toString().toLowerCase()) ||
        list.some((sector) => sector === record.setor.toLowerCase()) ||
        list.some(
          (location) => location === record.local_acionamento.toLowerCase()
        ) ||
        list.some(
          (recognizes) =>
            recognizes === record.reconhece.toString().toLowerCase()
        ) ||
        list.some(
          (eventDate) =>
            eventDate ===
            new Date(record.data_evento)
              .toLocaleDateString('pt-BR')
              .replace(/\//g, '-')
              .toLowerCase()
        )
      );
    });

    this.RecordsLoaded.emit(filteredValues);
    return filteredValues;
  }

  async getRecords(): Promise<void> {
    await lastValueFrom(this.http.get(this.recordsUrl, { responseType: 'json' })).then(
      (records) => {
        this.records = records as Evento[];
        this.RecordsLoaded.emit(this.records);
      }
    );
  }

  async getFailures(): Promise<void> {
    await lastValueFrom(this.http.get(this.failuresUrl, { responseType: 'json' })).then(
      (failures) => {
        this.records = failures as Evento[];
        this.FailuresLoaded.emit(this.records);
      }
    );
  }
}
