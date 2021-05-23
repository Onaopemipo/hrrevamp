import { ExpenseSubTypeService } from './../modules/expense/services/expense-group.service';
import { AddUpdatePaymentInstitutionServiceProxy, GetAllPaymentInstitutionsServiceProxy, AddUpdatePayScaleServiceProxy, GetAllPayrollTypesServiceProxy, GetAllPayElementsServiceProxy, AddUpdatePayElementServiceProxy, AddUpdateExpenseGroupServiceProxy, AddUpdateExpenseProjectServiceProxy, AddUpdateExpenseServiceProxy, AddUpdateLoanTypeServiceProxy, AddExpenseSubTypeServiceProxy, GetExpenseSubTypesServiceProxy } from 'app/_services/service-proxies';
import { MyPayrollInstitutionService, MyPayrollTypeService, MyPayElementService } from './../modules/payroll/services/common.service';
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
  NbDatepickerDirective,
  NbDialogRef,
  NbContextMenuModule
} from '@nebular/theme';


import { StatusComponent } from './status/status.component';
import { DatePipesPipe } from './pipes/date-pipes.pipe';
import { MaxStringLengthPipe } from './pipes/max-string-length.pipe';
import { WysisygInputComponent } from './wysisyg-input/wysisyg-input.component';
import { FormsModule } from '@angular/forms';
import { TablecomponentComponent } from './tablecomponent/tablecomponent.component';
import { TableheaderComponent } from './tableheader/tableheader.component';
import { SideModalComponent } from './side-modal/side-modal.component';
import { EmployeeListComponent, EmployeeMasterSearchComponent } from './employee-master-search/employee-master-search.component';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import { DateRangeComponent } from './date-range/date-range.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { MyMenuComponent, MyMenuItemComponent } from './my-menu/my-menu.component';
import { DateComponent } from './date/date.component';
import { MainBaseComponent } from './main-base/main-base.component';
import { CalComponent } from './cal/cal.component';
import { CalenderComponent } from './calender/calender.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';


import { alertmodalComponent } from '../_services/alertservice.service';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { ConfirmBoxServiceComponent } from 'app/_services/confirm-box.service';
import { LoadableButtonComponent } from './loadable-button/loadable-button.component';

import {   SearchEmployeesServiceProxy,
  GetAllDepartmentsServiceProxy,
  GradeLevelServiceProxy,
  GetAllJobRolesServiceProxy,
  GetAllLocationsServiceProxy,
  SalaryscaleServiceProxy,
  GetLocationByIdServiceProxy,
  TrainingServiceProxy,
  CommonServiceProxy,
  CreateLeavePlanServiceProxy,
  AssetManagementServiceProxy,
  FetchExpensesServiceProxy,
  GetExpenseTypesServiceProxy,
  GetExpenseProjectServiceProxy,
  GetExpenseGroupsServiceProxy,
  GetProjectActivityServiceProxy,
  AddUpdateProjectActivityServiceProxy,
} from '../_services/service-proxies';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { PageComponent } from './page/page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DepartmentsService } from 'app/modules/module-settings/services/departments.service';
import { LocationService } from 'app/modules/module-settings/services/location.service';
import { TrainingCategoryService } from 'app/modules/training/services/training-category.service';
import { TrainingSpecializationService } from 'app/modules/training/services/training-specialization.service';
import { TypesService } from 'app/modules/training/services/types.service';
import { ModuleSettingsProvidersModule } from 'app/modules/module-settings/module-settings-providers.module';
import { CreateleavePlanComponent } from './createleave-plan/createleave-plan.component';
import { CreateleaveRequestComponent } from './createleave-request/createleave-request.component';
import { VendorService } from 'app/modules/training/services/vendor.service';
import { CertificationService, QualificationService } from '../_services/common.service';
import { ExcelServiceService } from '../_services/excel-service.service';
import { PdfServiceService } from '../_services/pdf-service.service';
import {DeleteEventsServiceProxy} from '../_services/service-proxies'
import { AssetListService } from 'app/modules/asset-management/services/asset-list.service';
import { AssetCategoryService, AssetMakeService, AssetModelService, AssetStatusService, AssetSubTypeService, AssetTypeService } from 'app/modules/asset-management/services/asset-category.service';
import { ExpenseRequestService } from 'app/modules/expense/services/expense-request.service';
import { ExpenseGroupService, ExpenseProjectActivityService, ExpenseProjectService, ExpenseTypeService } from 'app/modules/expense/services/expense-group.service';
import { NamedStatusComponent } from './named-status/named-status.component';
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
    DateRangeComponent,
    DefaultContentComponent,
    SideModalComponent,
    EmployeeMasterSearchComponent,
    FileUploadComponent,
    AmountInputComponent,
    StatusCardComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    DateComponent,
    DefaultContentComponent,
    MainBaseComponent,
    CalComponent,
    CalenderComponent,
    BulkUploadComponent,
    EmployeeListComponent,
    alertmodalComponent,
    ConfirmBoxComponent,
    ConfirmBoxServiceComponent,
    LoadableButtonComponent,
    MultiSelectComponent,
    CustomFormComponent,
    PageComponent,
    CreateleavePlanComponent,
    CreateleaveRequestComponent,
    NamedStatusComponent,
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
    NbDialogModule.forChild(),
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
    NbCardModule,
    NbInputModule,
    NbContextMenuModule,
    NgMultiSelectDropDownModule,
    ModuleSettingsProvidersModule,
  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
    DecimalPipe,
    ɵa,
    NbMenuService,
    NbDatepickerDirective,
    SearchEmployeesServiceProxy,
    GetAllDepartmentsServiceProxy,
    GradeLevelServiceProxy,
    GetAllJobRolesServiceProxy,
    GetAllLocationsServiceProxy,
    SalaryscaleServiceProxy,
    CommonServiceProxy,
    LocationService,
    DepartmentsService,
    TrainingCategoryService,
    TrainingSpecializationService,
    GetAllDepartmentsServiceProxy,
    GetAllLocationsServiceProxy,
    GetLocationByIdServiceProxy,
    TypesService,
    LocationService,
    DepartmentsService,
    TrainingServiceProxy,
    CommonServiceProxy,
    CreateLeavePlanServiceProxy,
    VendorService,
    CertificationService,
    QualificationService,
    ExcelServiceService,
    PdfServiceService,
    DeleteEventsServiceProxy,
    MyPayrollInstitutionService,
    MyPayrollTypeService,
    MyPayElementService,
    AddUpdatePaymentInstitutionServiceProxy,
    GetAllPaymentInstitutionsServiceProxy,
    AddUpdatePayScaleServiceProxy,
    GetAllPayrollTypesServiceProxy,
    GetAllPayElementsServiceProxy,
    AddUpdatePayElementServiceProxy,
    AssetCategoryService,
    AssetTypeService,
    AssetSubTypeService,
    AssetMakeService,
    AssetModelService,
    AssetStatusService,
    AssetManagementServiceProxy,
    AssetListService,

    ExpenseRequestService,
    FetchExpensesServiceProxy,
    GetExpenseTypesServiceProxy,
    GetExpenseProjectServiceProxy,
    GetExpenseGroupsServiceProxy,
    GetProjectActivityServiceProxy,
    AddUpdateProjectActivityServiceProxy,
    ExpenseRequestService,
    ExpenseGroupService,
    ExpenseProjectActivityService,
    ExpenseProjectService,
    ExpenseTypeService,
    AddUpdateExpenseGroupServiceProxy,
    // GetExpenseGroupsServiceProxy,
    GetExpenseGroupsServiceProxy,
    AddUpdateExpenseProjectServiceProxy,
    AddUpdateExpenseServiceProxy,
    AddUpdateLoanTypeServiceProxy,
    ExpenseSubTypeService,
    AddExpenseSubTypeServiceProxy,
    GetExpenseSubTypesServiceProxy,
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
    NbIconModule,
    DefaultContentComponent,
    AmountInputComponent,
    StatusCardComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    RadioButtonComponent,
    TableheaderComponent,
    AmountInputComponent,
    DateRangeComponent,
    DateComponent,
    DefaultContentComponent,
    CommonModule,
    FormsModule,
    NbCardModule,
    NgxEchartsModule,
    TableheaderComponent,
    DatePipesPipe,
    CalComponent,
    NbInputModule,
    CalenderComponent,
    BulkUploadComponent,
    alertmodalComponent,
    EmployeeListComponent,
    ConfirmBoxComponent,
    NbDialogModule,
    ConfirmBoxServiceComponent,
    LoadableButtonComponent,
    PageComponent,
    MultiSelectComponent,
    CreateleavePlanComponent,
    CreateleaveRequestComponent,
    MultiSelectComponent,
  ],
})
export class ComponentsModule { }
