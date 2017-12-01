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
import { GlobalUserviewRoutingModule } from './global-userview-routing.module';
import { GlobalUserService} from './globaluser.service';
import { GlobalUserviewComponent} from './global-userview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({                //NgModule BEGINS
    imports: [                                //Mentioning the imported libararies and custom models
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        GlobalUserviewRoutingModule,
        NgxPaginationModule,
        StatModule,
        FormsModule
    ],
    declarations: [                //Declaring  the components
        GlobalUserviewComponent,
    ],
    providers:[GlobalUserService],    //providing the services
    schemas:[CUSTOM_ELEMENTS_SCHEMA]  //defining the schema
})                                    //NgModule ENDS
export class GlobalUserModule { }        //exporting Module class of GlobalUserViewComponent
