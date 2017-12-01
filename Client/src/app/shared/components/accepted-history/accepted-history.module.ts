import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from './../../../shared';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule} from 'ngx-pagination';
import { AcceptedUserHistory } from './accepted-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalUserService } from './../global-userview/globaluser.service';
import { AcceptedHistoryRoutingModule } from './accepted-history-routing.module';

@NgModule({                //NgModule BEGINS
    imports: [                                //Mentioning the imported libararies and custom models
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        NgxPaginationModule,
        AcceptedHistoryRoutingModule,
        StatModule,
        FormsModule
    ],
    declarations: [                //Declaring  the components
            AcceptedUserHistory
    ],
    providers:[GlobalUserService],    //providing the services
    schemas:[CUSTOM_ELEMENTS_SCHEMA]  //defining the schema
})                                    //NgModule ENDS
export class AcceptedHistoryModule { }        //exporting Module class of GlobalUserViewComponent
