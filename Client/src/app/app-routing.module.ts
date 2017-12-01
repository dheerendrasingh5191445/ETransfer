import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupervGuard } from './shared/guard/supervguard';
import { HrGuard } from './shared/guard/hrguard';
import { UserGuard } from './shared/guard/userguard';
import { AssetGuard } from './shared/guard/assetguard';
import { CsoGuard } from './shared/guard/csoguard';
import { ValidGuard } from './shared/guard/validguard.service';
import { ErrorComponent } from "./shared/components/error/error.component";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NiitianComponent } from './niitian/niitian.component';


const routes: Routes = [
    { path:'',redirectTo:'login/:value',pathMatch:'full'},
    { path:'login/:value',component : LoginComponent },
    { path:'dashboard', component:DashboardComponent,
    children:[
    { path: 'supervisor', loadChildren: './supervisor/supervisor.module#SupervisorModule',canActivate:[ValidGuard,SupervGuard]},
    { path: 'cso-control', loadChildren: './cso-control/cso.module#CsoControlModule',canActivate:[ValidGuard,CsoGuard]},
    { path: 'asset-control', loadChildren: './asset-control/asset-control.module#AssetControlModule',canActivate: [ValidGuard,AssetGuard]},
    { path: 'humanresource', loadChildren: './humanresource/humanresource.module#HumanResourceModule',canActivate: [ValidGuard,HrGuard]},
    { path: 'user',component: NiitianComponent },
    { path: 'myprofile',canActivate:[ValidGuard],
      loadChildren: './shared/components/user-control/user-control.module#UserControlModule'  } ,
    { path: 'assetaccepted',canActivate:[ValidGuard],
      loadChildren: './shared/components/accepted-history/accepted-history.module#AcceptedHistoryModule'  },
    { path: 'globaluser',canActivate:[ValidGuard],
      loadChildren: './shared/components/global-userview/global-userview.module#GlobalUserModule'  }
    ]},
    { path: 'error/:id', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
