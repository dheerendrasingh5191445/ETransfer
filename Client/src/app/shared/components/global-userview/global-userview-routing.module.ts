import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalUserviewComponent } from './global-userview.component';


const routes: Routes = [          //defining routes of the component
  {
    path: '', component: GlobalUserviewComponent
   }
];

@NgModule({        									//NgModule starts
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})																	//NgModule ends
export class GlobalUserviewRoutingModule { }      //exporting routing class of GlobalUSerViewComponent
