import { Component } from '@angular/core';
import { DeviceComponent } from '../components/device/device.component';
import { GridComponent } from '../components/grid/grid.component';
import { StatusComponent } from '../components/status/status.component';
import { LoadingComponent } from '../components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DeviceComponent, GridComponent, StatusComponent, LoadingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isLoading: boolean = true;

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
