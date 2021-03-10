import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollcomponentComponent } from './payrollcomponent/payrollcomponent.component';
import { PaymentcreateComponent } from './paymentcreate/paymentcreate.component';
import { InstitutionalmanagementComponent } from './institutionalmanagement/institutionalmanagement.component';
import { PaymenysetupComponent } from './paymenysetup/paymenysetup.component';


const routes: Routes = [
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
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
