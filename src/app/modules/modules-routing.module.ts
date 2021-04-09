import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../_services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: ModulesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canLoad: [AuthGuard],
    },
    {
      path: 'complaints',
      loadChildren: () => import('../modules/requests-and-complaints/requests-and-complaints.module')
        .then(m => m.RequestsAndComplaintsModule),
    },
    {
      path: 'training',
      loadChildren: () => import('../modules/training/training.module')
      .then(m => m.TrainingModule)
    },
    {
      path: 'self-service',
      loadChildren: () => import('../modules/self-service/self-service.module')
      .then( m => m.SelfServiceModule )
    },
    {
      path: 'payroll',
      loadChildren: () => import('../modules/payroll/payroll.module')
      .then( m => m.PayrollModule )
    },
    {
      path: 'communications',
      loadChildren: () => import('../modules/communication/communication.module')
        .then(m => m.CommunicationModule)
    },
    {
      path: 'disbursement',
      loadChildren: () => import('../modules/disbursement/disbursement.module')
        .then(m => m.DisbursementModule)
    },
    {
      path: 'leave',
      loadChildren: () => import('../modules/leave/leave.module')
        .then(m => m.LeaveModule)
    },
    {
      path: 'expenses',
      loadChildren: () => import('../modules/expense/expense.module')
        .then(m => m.ExpenseModule)
    },
    {
      path: 'employeemodule',
      loadChildren: () => import('../modules/employeemodule/employeemodule.module')
        .then(m => m.EmployeemoduleModule)
    },
    {
      path: 'benefits',
      loadChildren: () => import('../modules/benefit/benefit.module')
        .then(m => m.BenefitModule)
    },

    {
      path: 'interviewers',
      loadChildren: () => import('./recruitment/interviewerdashboard/interviewerdashboard.module')
      .then(m => m.InterviewerdashboardModule)
    },
    {
      path: 'recruitmentadmin',
      loadChildren: () => import('./recruitment/admin-dashboard/admindashboard.module')
      .then(m => m.AdminDashboardModule)
    },
    {
      path: 'timeandattendance',
      loadChildren: () => import('./time-and-attendance/time-and-attendance.module')
      .then(m => m.TimeAndAttendanceModule)
    },
    {
      path: 'discipline',
      loadChildren: () => import('./disciplinary-management/disciplinary-management.module')
      .then(m => m.DisciplinaryManagementModule)
    },
    {
      path: 'performance',
      loadChildren: () => import('./performance/performance.module')
      .then(m => m.PerformanceModule)
    },

    {
      path: 'career-succession',
      loadChildren: () => import('./career-succession/career-succession.module')
      .then(m => m.CareerSuccessionModule)
    },
    {
      path: 'setup',
      loadChildren: () => import('./module-settings/module-settings.module')
      .then(m => m.ModuleSettingsModule)
    },

    {
      path: 'loan',
      loadChildren: () => import('./loan/loan.module')
      .then(m => m.LoanModule)
    },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
