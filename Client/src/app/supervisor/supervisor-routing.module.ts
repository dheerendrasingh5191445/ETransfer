import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorComponent } from './supervisor.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RequestGenerateComponent } from './request-generate/request-generate.component';
import { AssetassignComponent } from './assetassign/assetassign.component';
import { GeneratedRequestsComponent } from './generated-requests/generated-requests.component';
import { RejectedassetassignComponent } from './rejectedassetassign/rejectedassetassign.component';
import { DashboardComponent } from './supervisor-dashboard/dashboard.component';

import { SupervGuard } from './../shared/guard/supervguard';
import { ValidGuard } from './../shared/guard/validguard.service';
const routes: Routes = [
  {
    path: '', component: SupervisorComponent,
    children: [
        { path: 'roledashboard',canActivate:[ValidGuard,SupervGuard],component:DashboardComponent},
        { path: 'employeelist',canActivate:[ValidGuard,SupervGuard],component:EmployeeListComponent },
        { path: 'rejectedAssetlist',canActivate:[ValidGuard,SupervGuard],component:RejectedassetassignComponent},
        { path: 'generatedrequest',canActivate:[ValidGuard,SupervGuard],component:GeneratedRequestsComponent},
        { path: 'requestgenerate/:id',canActivate:[ValidGuard,SupervGuard],component: RequestGenerateComponent,
        children :[
        { path:'assetassign',canActivate:[ValidGuard,SupervGuard],component:AssetassignComponent}
        ]}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
