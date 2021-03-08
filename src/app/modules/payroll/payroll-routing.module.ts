import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollcomponentComponent } from './payrollcomponent/payrollcomponent.component';
import { PaymentcreateComponent } from './paymentcreate/paymentcreate.component';
import { InstitutionalmanagementComponent } from './institutionalmanagement/institutionalmanagement.component';


const routes: Routes = [
{
  path: 'payee', component:PayrollcomponentComponent  
},
{
  path: 'paymentcreate', component:PaymentcreateComponent  
},
{
  path: 'institutionalmanagement', component:InstitutionalmanagementComponent 
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
