import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbTabsetModule,
  NbActionsModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbPopoverModule,
  NbDialogModule
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ThemeModule } from '../../@theme/theme.module';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { PayrollcomponentComponent } from './payrollcomponent/payrollcomponent.component';
import { PaymentcreateComponent } from './paymentcreate/paymentcreate.component';
import { InstitutionalmanagementComponent, PayrollElementComponent, PayrollTypeComponent } from './institutionalmanagement/institutionalmanagement.component';
import { PaymenysetupComponent } from './paymenysetup/paymenysetup.component';
import { PayelementComponent } from './payelement/payelement.component';
import { EditpaymentformComponent } from './editpaymentform/editpaymentform.component';
import { PayscalesetupComponent } from './payscalesetup/payscalesetup.component';
import { PayscaletableComponent } from './payscaletable/payscaletable.component';
import { ViewpayscaleComponent } from './viewpayscale/viewpayscale.component';
import { QuickypayrollComponent } from './quickypayroll/quickypayroll.component';
import { AssignpayscaleComponent } from './assignpayscale/assignpayscale.component';
import { PayrollreportComponent } from './payrollreport/payrollreport.component';
import { ReviewpayrollComponent } from './reviewpayroll/reviewpayroll.component';
import { PayrollanalysisComponent } from './payrollanalysis/payrollanalysis.component';
import { AnalysistestpayComponent } from './analysistestpay/analysistestpay.component';
import { DetailsTestPayComponent } from './details-test-pay/details-test-pay.component';
import { PayrollRunLogComponent } from './payroll-run-log/payroll-run-log.component';
import { MyPayElementService, MyPayrollInstitutionService, MyPayrollTypeService } from './services/common.service';
import { AddUpdatePayElementServiceProxy, AddUpdatePaymentInstitutionServiceProxy, AddUpdatePayScaleServiceProxy, GetAllPayElementsServiceProxy, GetAllPaymentInstitutionsServiceProxy, GetAllPayrollTypesServiceProxy } from 'app/_services/service-proxies';


@NgModule({
  declarations: [
    PayrollComponent,
    PayrollcomponentComponent,
    PaymentcreateComponent,
    InstitutionalmanagementComponent,
    PaymenysetupComponent,
    PayelementComponent,
    EditpaymentformComponent,
    PayscalesetupComponent,
    PayscaletableComponent,
    ViewpayscaleComponent,
    QuickypayrollComponent,
    AssignpayscaleComponent,
    PayrollreportComponent,
    ReviewpayrollComponent,
    PayrollanalysisComponent,
    AnalysistestpayComponent,
    DetailsTestPayComponent,
    PayrollRunLogComponent,
    PayrollTypeComponent,
    PayrollElementComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    PayrollRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbTabsetModule,
    NbActionsModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbPopoverModule,
    NbDialogModule,
    ngFormsModule,
    ComponentsModule,
    ThemeModule,
  ],
  providers: [
    MyPayrollInstitutionService,
    MyPayrollTypeService,
    MyPayElementService,
    AddUpdatePaymentInstitutionServiceProxy,
    GetAllPaymentInstitutionsServiceProxy,
    AddUpdatePayScaleServiceProxy,
    GetAllPayrollTypesServiceProxy,
    GetAllPayElementsServiceProxy,
    AddUpdatePayElementServiceProxy,
  ],
})
export class PayrollModule { }
