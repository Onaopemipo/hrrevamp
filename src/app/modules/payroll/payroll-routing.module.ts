import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollcomponentComponent } from './payrollcomponent/payrollcomponent.component';
import { PaymentcreateComponent } from './paymentcreate/paymentcreate.component';
import { InstitutionalmanagementComponent, PayrollElementComponent, PayrollTypeComponent } from './institutionalmanagement/institutionalmanagement.component';
import { PaymenysetupComponent } from './paymenysetup/paymenysetup.component';
import { PayelementComponent } from './payelement/payelement.component';
import { PayrollComponent } from './payroll.component';
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





const routes: Routes = [
  {
    path: '',
    component: PayrollComponent,
    children: [
      {
        path: 'types',
        component: PayrollTypeComponent,
      },
      {
        path: 'payee', component:PayrollcomponentComponent  
      },
      {
        path: 'paymentcreate', component:PaymentcreateComponent  
      },
      {
        path: 'institutionalmanagement', component:InstitutionalmanagementComponent 
      },
      {
        path: 'paymentsetup', component:PaymenysetupComponent
      },
      {
        path: 'payelement', component: PayrollElementComponent
      }
      ,
      {
        path: 'editpayment', component:EditpaymentformComponent
      }, 
      {
        path: 'payscalesetup', component:PayscalesetupComponent
      },
      {
        path: 'payscaletable', component:PayscaletableComponent
      },
      {
        path: 'viewpayscale', component:ViewpayscaleComponent

      },
      {
        path: 'quickpayroll', component:QuickypayrollComponent
      },
      {
        path: 'assignpayscale', component:AssignpayscaleComponent
      },
      {
        path: 'report', component:PayrollreportComponent
      }, 
      {
        path: 'reviewpayroll', component:ReviewpayrollComponent
      },
      {
        path: 'payrollanalysis', component:PayrollanalysisComponent
      },
      {
        path: 'analysistestpay', component:AnalysistestpayComponent
      },
      {
        path: 'payslipanalysis', component:DetailsTestPayComponent
      },
      {
        path: 'runlog', component:PayrollRunLogComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
