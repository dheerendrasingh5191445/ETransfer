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

import { DashboardComponent  } from './asset-control-dashboard/dashboard.component';
import { AssetDiscrepancyComponent  } from './asset-discrepancy/asset-discrepancy.component';
import { AssetListComponent  } from './asset-list/asset-list.component';
import { UserControlService } from './../shared';
import { AssetControlRoutingModule } from './asset-control-routing.module';
import { AssetControlService} from './asset-control.service';
import { AssetControlComponent} from './asset-control.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        NgxPaginationModule,
        AssetControlRoutingModule,
        StatModule,
        FormsModule
    ],
    declarations: [
        AssetControlComponent,
        DashboardComponent,
        AssetDiscrepancyComponent,
        AssetListComponent
    ],
    providers:[AssetControlService, UserControlService],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AssetControlModule { }
