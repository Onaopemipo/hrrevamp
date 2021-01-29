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
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { StatusComponent } from './status/status.component';
import { DatePipesPipe } from './pipes/date-pipes.pipe';
import { MaxStringLengthPipe } from './pipes/max-string-length.pipe';
import { WysisygInputComponent } from './wysisyg-input/wysisyg-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComponentsheaderComponent,
    StatusComponent,
    DatePipesPipe,
    MaxStringLengthPipe,
    WysisygInputComponent
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
  ],
  providers: [
    // MaxStringLengthPipe
  ],
  exports: [
    ComponentsheaderComponent,
    StatusComponent,
    NbButtonModule,
    // DatePipesPipe,
    // CKEditorComponent,
    // CKEditorModule,
    MaxStringLengthPipe,
    WysisygInputComponent,
  ],
})
export class ComponentsModule { }
