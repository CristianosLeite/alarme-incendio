import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  @Output() statusChanged: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();

  emitStatus(status: boolean | null) {
    this.statusChanged.emit(status);
  }
}
