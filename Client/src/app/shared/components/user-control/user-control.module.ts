import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';

import { UserControlRoutingModule } from './user-control-routing.module';
import { UserControlComponent } from './user-control.component';
import { UserControlService} from './user-control.service';
import { StatModule } from '../../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        UserControlRoutingModule,
        StatModule,
    ],
    declarations: [
        UserControlComponent
    ],
    providers:[UserControlService]
})
export class UserControlModule { }
