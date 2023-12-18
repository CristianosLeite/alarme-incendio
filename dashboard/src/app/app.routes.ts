import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlarmHistoryComponent } from './alarm-history/alarm-history.component';
import { FailuresHistoryComponent as FailureHistoryComponent } from './failures-history/failures-history.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'alarm-history', component: AlarmHistoryComponent },
  { path: 'failure-history', component: FailureHistoryComponent },
];
