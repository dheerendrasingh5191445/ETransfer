import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule,NgbAlertModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { StatModule } from '../shared';
import { FormsModule } from '@angular/forms';
import { SupervisorRoutingModule } from './supervisor-routing.module';

import {SupervisorService} from './supervisor.service';

import { SupervisorComponent } from './supervisor.component';
import { RejectedassetassignComponent } from './rejectedassetassign/rejectedassetassign.component';
import { RequestGenerateComponent } from './request-generate/request-generate.component';
import { AssetassignComponent } from './assetassign/assetassign.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { GeneratedRequestsComponent } from './generated-requests/generated-requests.component';
import { DashboardComponent } from './supervisor-dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        SupervisorRoutingModule,
        StatModule,
        FormsModule,
        NgxPaginationModule,
    ],
    declarations: [
        SupervisorComponent,
        RejectedassetassignComponent,
        RequestGenerateComponent,
        AssetassignComponent,
        EmployeeListComponent,
        GeneratedRequestsComponent,
        DashboardComponent
    ],
    providers:[SupervisorService],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SupervisorModule { }
