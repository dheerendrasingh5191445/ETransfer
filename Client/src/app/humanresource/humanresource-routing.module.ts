import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumanresourceComponent } from './humanresource.component';
import { HrViewrequestComponent } from './hr-viewrequest/hr-viewrequest.component';
import { HrDashboardComponent } from './hr-dashboard/hr.component';
import { DiscrepancyreportComponent } from './discrepancyreport/discrepancyreport.component';


const routes: Routes = [
  {
    path: '', component: HumanresourceComponent,
    children: [
      { path: 'roledashboard', component:HrDashboardComponent },
      { path: 'hr-viewrequest', component:HrViewrequestComponent  }  ,
      { path: 'discrepancy-report', component:DiscrepancyreportComponent },       
     ]
   }
];

@NgModule({  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourceRoutingModule { }
;