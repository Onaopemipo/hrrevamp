/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import {
//   NbChatModule,
//   NbDatepickerModule,
//   NbDialogModule,
//   NbMenuModule,
//   NbSidebarModule,
//   NbToastrModule,
//   NbWindowModule,
// } from '@nebular/theme';
// import {
//   NbActionsModule,
//   NbButtonModule,
//   NbCardModule,
//   NbCheckboxModule,
//  NbIconModule,
//   NbInputModule,
//   NbRadioModule,
//   NbSelectModule,
//   NbUserModule,
//   NbTreeGridModule,
//   NbTabsetModule,
//   NbTooltipModule,
//   NbPopoverModule,
//   NbAlertModule,
//   NbSearchModule, 
//   NbCalendarKitModule,
//   NbCalendarModule,
//   NbCalendarRangeModule,
//   NbProgressBarModule,
//   NbSpinnerModule,
//   NbListModule,
  
// } from '@nebular/theme';


import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//Services
import { CountryserviceService } from './_services/countryservice.service';
import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_services/jwt.interceptor';

//Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    Ng2SmartTableModule,
    CKEditorModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    CountryserviceService,
    AuthService,
    AuthGuardService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class AppModule {
}
