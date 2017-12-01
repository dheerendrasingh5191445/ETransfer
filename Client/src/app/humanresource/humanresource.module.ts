import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../shared';
import { FormsModule } from '@angular/forms';

import {  UserControlService } from './../shared';
import { HumanResourceRoutingModule } from './humanresource-routing.module';
import { HumanresourceComponent } from './humanresource.component';
import { HrViewRequestService} from './hr.service';
import { HrDashboardComponent } from './hr-dashboard/hr.component';
import { HrViewrequestComponent } from './hr-viewrequest/hr-viewrequest.component';
import { DiscrepancyreportComponent } from './discrepancyreport/discrepancyreport.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        HumanResourceRoutingModule,
        StatModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        HumanresourceComponent,
        DiscrepancyreportComponent,
        HrViewrequestComponent,
        HrDashboardComponent
    ],
    providers:[HrViewRequestService, UserControlService],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HumanResourceModule { }
