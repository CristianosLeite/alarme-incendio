import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlarmHistoryComponent } from './alarm-history/alarm-history.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'alarm-history', component: AlarmHistoryComponent }
];
