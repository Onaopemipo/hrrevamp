import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsheaderComponent } from './componentsheader/componentsheader.component';
import { CoreModule } from '../@core/core.module';
import { ThemeModule } from '../@theme/theme.module';
import { CKEditorComponent, CKEditorModule } from 'ckeditor4-angular';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
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
} from '@nebular/theme';

import { StatusComponent } from './status/status.component';
import { DatePipesPipe } from './pipes/date-pipes.pipe';
import { MaxStringLengthPipe } from './pipes/max-string-length.pipe';
import { WysisygInputComponent } from './wysisyg-input/wysisyg-input.component';
import { FormsModule } from '@angular/forms';
import { TablecomponentComponent } from './tablecomponent/tablecomponent.component';
import { TableheaderComponent } from './tableheader/tableheader.component';

@NgModule({
  declarations: [
    ComponentsheaderComponent,
    StatusComponent,
    DatePipesPipe,
    MaxStringLengthPipe,
    WysisygInputComponent,
    TableheaderComponent,
    TablecomponentComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
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
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
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
  ],
  providers: [
    // MaxStringLengthPipe
  ],
  exports: [
    ComponentsheaderComponent,
    StatusComponent,
    NbButtonModule,
    MaxStringLengthPipe,
    WysisygInputComponent,
  ],
})
export class ComponentsModule { }
