import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsoControlComponent } from './cso-control.component';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { UserControlComponent } from './../shared';
import { AcceptHistoryComponent} from './accept-history/accept-history.component';
import { DashboardComponent } from './cso-dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: CsoControlComponent,
    children: [
        { path: 'roledashboard',component:DashboardComponent },
        { path: 'approval-list', component:ApprovalListComponent },
        { path: 'approved-history',component:AcceptHistoryComponent }
   ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsoRoutingModule { }
