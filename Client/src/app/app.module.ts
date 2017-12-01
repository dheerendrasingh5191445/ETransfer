import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule,NgbAlertModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StatModule } from './shared';

import { ErrorComponent} from "./shared/components/error/error.component";
import { MyLoginService} from "./shared/guard/mylogin.service";
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './shared/loader/loader.component';

import { ValidGuard } from './shared/guard/validguard.service'; 
import { SupervGuard } from './shared/guard/supervguard';
import { HrGuard } from './shared/guard/hrguard';
import { UserGuard } from './shared/guard/userguard';
import { AssetGuard } from './shared/guard/assetguard';
import { CsoGuard } from './shared/guard/csoguard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NiitianComponent } from './niitian/niitian.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        LoginComponent,
        LoaderComponent,
        DashboardComponent,
        NiitianComponent
    ],
    imports: [
        CommonModule,
        StatModule,
        FormsModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [MyLoginService,ValidGuard,CsoGuard,SupervGuard,HrGuard,UserGuard,AssetGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
