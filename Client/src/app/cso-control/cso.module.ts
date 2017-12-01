import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';


import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../shared';
import { FormsModule } from '@angular/forms';

import { UserControlService } from './../shared';
import { CsoRoutingModule } from './cso-routing.module';
import { CsoControlComponent } from './cso-control.component';
import { CsoService } from './cso.service';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { AcceptHistoryComponent} from './accept-history/accept-history.component';
import { DashboardComponent } from './cso-dashboard/dashboard.component';



@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
       
        NgxPaginationModule,
        CsoRoutingModule,
        StatModule,
        FormsModule
    ],
    declarations: [
        CsoControlComponent,
        ApprovalListComponent,
        DashboardComponent,
        AcceptHistoryComponent,

    ],
    providers:[CsoService, UserControlService],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CsoControlModule { }
