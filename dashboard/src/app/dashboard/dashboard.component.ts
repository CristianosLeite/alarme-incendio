import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { DeviceComponent } from '../components/device/device.component';
import { GridComponent } from '../components/grid/grid.component';
import { StatusComponent } from '../components/status/status.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DeviceComponent,
    GridComponent,
    StatusComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
