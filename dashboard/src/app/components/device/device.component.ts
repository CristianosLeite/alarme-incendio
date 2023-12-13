import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [NgIf],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent {

  @Input() device: string = 'none';
  @Input() status: boolean = true;
  @Input() imgPath: string = '';

  constructor() { }

}
