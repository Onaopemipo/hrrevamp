import { NgxEchartsModule } from 'ngx-echarts';
import { DefaultContentComponent } from './default-content/default-content.component';

import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsheaderComponent } from './componentsheader/componentsheader.component';
import { CoreModule } from '../@core/core.module';
import { ThemeModule } from '../@theme/theme.module';
import { CKEditorComponent, CKEditorModule } from 'ckeditor4-angular';
import Flow from '@flowjs/flow.js';
// import { EchartsPieComponent } from '../../../src/app/pages/dashboard/';
// import { EchartsBarComponent } from './echarts/echarts-bar.component';

import { DecimalPipe } from '@angular/common';


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
  NbFormFieldModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
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
  ɵa,
  NbMenuService,
} from '@nebular/theme';

import { StatusComponent } from './status/status.component';
import { DatePipesPipe } from './pipes/date-pipes.pipe';
import { MaxStringLengthPipe } from './pipes/max-string-length.pipe';
import { WysisygInputComponent } from './wysisyg-input/wysisyg-input.component';
import { FormsModule } from '@angular/forms';
import { TablecomponentComponent } from './tablecomponent/tablecomponent.component';
import { TableheaderComponent } from './tableheader/tableheader.component';
import { SideModalComponent } from './side-modal/side-modal.component';
import { EmployeeMasterSearchComponent } from './employee-master-search/employee-master-search.component';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import { StatusCardComponent } from './status-card/status-card.component';
import { MyMenuComponent, MyMenuItemComponent } from './my-menu/my-menu.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    ComponentsheaderComponent,
    StatusComponent,
    DatePipesPipe,
    MaxStringLengthPipe,
    WysisygInputComponent,
    TableheaderComponent,
    TablecomponentComponent,
    FileUploadComponent,
    RadioButtonComponent,
    SideModalComponent,
    EmployeeMasterSearchComponent,
    FileUploadComponent,
    AmountInputComponent,
    StatusCardComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    DefaultContentComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
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
    NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    CKEditorModule,
    NbTreeGridModule,
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
    NbFormFieldModule,
    NbDatepickerModule,
    NgxFlowModule,
    NgxEchartsModule,
    NbIconModule,
    NbFormFieldModule,
    NbCardModule
    // NgxChartsModule
  ],
  providers: [
    // MaxStringLengthPipe
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
    DecimalPipe,
    ɵa,
    NbMenuService,
  ],
  exports: [
    ComponentsheaderComponent,
    StatusComponent,
    NbButtonModule,
    MaxStringLengthPipe,
    WysisygInputComponent,
    SideModalComponent,
    TablecomponentComponent,
    NbTabsetModule,
    EmployeeMasterSearchComponent,
    FileUploadComponent,
    AmountInputComponent,
    StatusCardComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    // NbMenuModule,
    DefaultContentComponent,
    CommonModule,
    FormsModule,
    NbCardModule,
    NgxEchartsModule,
    TableheaderComponent
  ],
})
export class ComponentsModule { }
