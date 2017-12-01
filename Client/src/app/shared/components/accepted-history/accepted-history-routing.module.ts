import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptedUserHistory } from './accepted-history.component';


const routes: Routes = [          //defining routes of the component
  {
    path: '', component: AcceptedUserHistory
   }
];

@NgModule({        									//NgModule starts
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})																	//NgModule ends
export class AcceptedHistoryRoutingModule { }      //exporting routing class of GlobalUSerViewComponent
