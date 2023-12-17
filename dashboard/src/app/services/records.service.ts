import { Injectable, Output, EventEmitter } from '@angular/core';
import { Record } from '../interfaces/record.interface';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  @Output() RecordsLoaded = new EventEmitter<any[]>();
  records: Record[] = [
    {
      id: 1,
      location: 'Setor G1',
      recognizes: false,
      eventDate: '17-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 2,
      location: 'Setor G2',
      recognizes: false,
      eventDate: '18-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 3,
      location: 'Setor G3',
      recognizes: false,
      eventDate: '19-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 4,
      location: 'Setor G4',
      recognizes: false,
      eventDate: '20-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 5,
      location: 'Setor G5',
      recognizes: false,
      eventDate: '21-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 6,
      location: 'Setor G6',
      recognizes: false,
      eventDate: '22-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 7,
      location: 'Setor G7',
      recognizes: false,
      eventDate: '23-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 8,
      location: 'Setor G8',
      recognizes: false,
      eventDate: '24-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    },
    {
      id: 9,
      location: 'Setor G9',
      recognizes: false,
      eventDate: '25-12-2023',
      activatedAt: '11:00:00',
      deactivatedAt: '12:00:00',
    }
  ];

  constructor() { }

  filterRecords(tags: string[]) {
    if (tags.length === 0) {
      this.RecordsLoaded.emit(this.records);
      return this.records;
    }
    // Converte todas as tags para letras minúsculas.
    const list = tags.map(tag => tag.toLowerCase().trim());
    // Filtra os usuários de acordo com as tags passadas.
    const filteredValues = this.records.filter((record: Record) => {
      return list.some(id =>
        id === record.id.toString().toLowerCase()
      ) || list.some(location =>
        location === record.location.toLowerCase()
      )|| list.some(recognizes =>
        recognizes === record.recognizes.toString().toLowerCase()
      ) || list.some(eventDate =>
        eventDate === record.eventDate.toLowerCase()
      ) || list.some(activatedAt =>
        activatedAt === record.activatedAt.toLowerCase()
      ) || list.some(deactivatedAt =>
        deactivatedAt === record.deactivatedAt.toLowerCase()
      ) || list.some(period =>
        record.eventDate.toLowerCase().includes(period)
      );
    });
    // Emite um evento com os usuários filtrados.
    this.RecordsLoaded.emit(filteredValues);
    return filteredValues;
  }
}
