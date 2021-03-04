import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeonboardingdashboardComponent } from './employeeonboardingdashboard/employeeonboardingdashboard.component';

import { EmployeemoduleComponent } from './employeemodule.component';
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
import { OnboardingemployeesComponent } from './onboardingemployees/onboardingemployees.component';
import { HiringchecklistComponent } from './hiringchecklist/hiringchecklist.component';
import { PromotioneligibilityComponent } from './promotioneligibility/promotioneligibility.component';
import { EligibilityxxComponent } from './eligibilityxx/eligibilityxx.component';
import { AnothereligibilitylistComponent } from './anothereligibilitylist/anothereligibilitylist.component';
import { EmployeedeploymentmanagementComponent } from './employeedeploymentmanagement/employeedeploymentmanagement.component';
import { DeploymentviewComponent } from './deploymentview/deploymentview.component';
import { ManagementviewComponent } from './managementview/managementview.component';
import { DeploymentapplicationComponent } from './deploymentapplication/deploymentapplication.component';
import { EmployeepersonalinformationComponent } from './employeepersonalinformation/employeepersonalinformation.component';

import { EmployeerecordsComponent } from './employeerecords/employeerecords.component';
import { EmployeerecordsviewComponent } from './employeerecordsview/employeerecordsview.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeemoduleComponent,
    children:
      [
        {
          path: 'dashboard',
          component: EmployeeonboardingdashboardComponent
        },
        {
          path: 'allemployees',
          component: OnboardingemployeesComponent
        },
        {
          path: 'employeeonboarding',
          component: HiringchecklistComponent
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
          path: 'exitrequest',
          component: ExistrequestComponent
        },
        {
          path: 'retirement',
          component: RetirementComponent
        },
  
        {
          path: 'retirementform',
          component: RetirementformComponent
        },

        {
          path: 'exitwarning',
          component: ExitwarningComponent
        },
      
        {
          path: 'comfirmation',
          component: ComfirmationComponent
        },
        
        {
          path: 'confirmation/employeeview',
          component: EmployeeviewComponent
        },
            
        {
          path: 'promotion',
          component: PromotionComponent
        },
              
        {
          path: 'promotioninfo',
          component: PromotioninfoComponent
        },

        {
          path: 'eligible',
          component: PromotioneligibilityComponent,
        },       
            
        {
          path: 'eligiblexx',
          component:EligibilityxxComponent
        },       

        {
          path: 'eligiblelist',
          component:AnothereligibilitylistComponent
        },       
          
        {
          path: 'employeedeployment',
          component:EmployeedeploymentmanagementComponent
        },       

        {
          path: 'managementview',
          component:ManagementviewComponent
        },    

        {
          path: 'deploymentview',
          component:DeploymentviewComponent
        },
        
        {
          path: 'deploymentapplication',
          component:DeploymentapplicationComponent
        },  

        
        {
          path: 'employeerecords',
          component:EmployeerecordsComponent
        },
        
        {
          path: 'viewemployeerecords',
          component:EmployeerecordsviewComponent
        },  
        {
          path: 'employeepersonalinformation',
             component:EmployeepersonalinformationComponent
           },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: '**',
          component: EmployeeonboardingdashboardComponent,
        },       
              


       
            
          

      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemoduleRoutingModule { }
