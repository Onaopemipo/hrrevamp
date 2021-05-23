import { RecruitmentJobServiceProxy } from './_services/service-proxies';


/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// import { interactionPlugin } from '@fullcalendar/angular';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DecimalPipe } from '@angular/common';
import {FetchDashboardDataServiceProxy} from './_services/service-proxies'

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  // NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbPopoverModule,
  NbAlertModule,
  NbSearchModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbProgressBarModule,
  NbSpinnerModule,
  NbListModule,
  NbLayoutModule,
  NbDialogService,


} from '@nebular/theme';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// Services
import { CountryserviceService } from './_services/countryservice.service';
import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_services/jwt.interceptor';

import { InputvalidationService } from './_services/inputvalidation.service';
import { GetTokenServiceProxy, UserLoginDTO } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CustomServiceService  } from 'app/_services/custom-service.service';
import { ComponentsModule } from 'app/components/components.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConfirmBoxService } from './_services/confirm-box.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EligilibilyviewComponent } from './benefit/eligilibilyview/eligilibilyview.component';
import { BenefitComponent } from './eligibilityview/benefit/benefit.component';
// import{CalComponent} from '../app/components/cal/cal.component'
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
  declarations: [AppComponent, EligilibilyviewComponent, BenefitComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule ,
    // NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    // NbDatepickerModule.forRoot(),
    // NbDialogModule.forRoot(),
    // NbWindowModule.forRoot(),
    // NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    // CoreModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NbTooltipModule,
    NbPopoverModule,
    CKEditorModule,
    NbAlertModule,
    NbSearchModule,
    NbCalendarKitModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbProgressBarModule,
    NbSpinnerModule,
    NbListModule,
    NbLayoutModule,
    NgxChartsModule,
    NbDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ComponentsModule,

  ],
  bootstrap: [AppComponent],
  providers: [
    CountryserviceService,
    AuthService,
    AuthGuardService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    InputvalidationService,

    DecimalPipe,
    GetTokenServiceProxy,
    ConfirmBoxService,
    NbDialogService,
    AlertserviceService,
    FetchDashboardDataServiceProxy,
    CustomServiceService,
    RecruitmentJobServiceProxy
  ],
})
export class AppModule {
}
