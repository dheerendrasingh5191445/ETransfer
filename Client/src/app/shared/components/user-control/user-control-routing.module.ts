import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserControlComponent } from './user-control.component';

const routes: Routes = [
    { path: '', component: UserControlComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserControlRoutingModule { }
