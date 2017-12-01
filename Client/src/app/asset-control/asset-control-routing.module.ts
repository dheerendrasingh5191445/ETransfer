import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetControlComponent } from './asset-control.component';
import { AssetListComponent} from './asset-list/asset-list.component';
import { DashboardComponent  } from './asset-control-dashboard/dashboard.component';
import { AssetDiscrepancyComponent  } from './asset-discrepancy/asset-discrepancy.component';

const routes: Routes = [
  {
    path: '', component: AssetControlComponent,
    children: [
      { path: 'roledashboard', component:DashboardComponent },
      { path: 'asset-list', component:AssetListComponent },
      { path: 'asset-discrepancy', component:AssetDiscrepancyComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetControlRoutingModule { }
