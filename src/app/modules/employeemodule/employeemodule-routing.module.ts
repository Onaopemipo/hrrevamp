import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';
import { EmploymentexitmanagementComponent } from './employmentexitmanagement/employmentexitmanagement.component';
import { ManagementexistComponent } from './managementexist/managementexist.component';
import { ExistrequestComponent } from './existrequest/existrequest.component';
import { RetirementComponent } from './retirement/retirement.component';
import { RetirementformComponent } from './retirementform/retirementform.component';
import { ExitwarningComponent } from './exitwarning/exitwarning.component';
import { ComfirmationComponent } from './comfirmation/comfirmation.component';
import { EmployeeviewComponent } from './employeeview/employeeview.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotioninfoComponent } from './promotioninfo/promotioninfo.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeonboardingdashboardComponent
},
{
  path: 'exitmanagement',
  component: EmploymentexitmanagementComponent
},
{
  path: 'exitform',
  component: ManagementexistComponent
},
{
path : 'exitrequest',
component : ExistrequestComponent
},
{
  path : 'retirement',
  component : RetirementComponent
  },
  
  {
    path : 'retirementform',
    component : RetirementformComponent
    },

    {
      path : 'exitwarning',
      component : ExitwarningComponent
      },
      
      {
        path : 'comfirmation',
        component : ComfirmationComponent
        },
        
        {
          path : 'employeeview',
          component : EmployeeviewComponent
          },

          {
            path : 'comfirmation',
            component : ComfirmationComponent
            },
            
            {
              path : 'promotion',
              component : PromotionComponent
              },
              
              {
                path : 'promotioninfo',
                component : PromotioninfoComponent
                },
                
              
            
          

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemoduleRoutingModule { }
