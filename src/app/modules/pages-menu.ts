import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Home',
    icon: '/assets/icons/home.jpg',
    link: '/dashboard',

    
  },
 
  {
    title: 'CORE HR',
    group: true,
  },
  {
    title: 'Employee Self Service',
    icon: '/assets/icons/EmployeeManagement.jpg',
    children: [
      {
        title: 'Self Service Dashboard',
        link: '/self-service',
      },
      {
        title: 'Employee Events',
        link: '/self-service/employeeevents',
      },
      {
        title: 'My Profile',
        link: '/myprofile',
      },
      {
        title: 'My Leave',
        link: '/myleave',
      },
      {
        title: 'Exit Process',
        link: '/employeemodule/exitrequest',
      },
    ],
  },
  {
    title: 'Employee Management',
    icon: '/assets/icons/EmployeeManagement.jpg',
    children: [
      {
        title: 'Onboarding Dashboard',
        link: '/employeemodule',
      },
      {
        title: 'Onboarding Employees',
        link: '/employeemodule/allemployees',
      },
      {
        title: 'Exit Management',
        link: '/employeemodule/exitmanagement',
      },
      {
        title: 'Retirements',
        link: '/employeemodule/retirement',
      },
      {
        title: 'Confirmation',
        link: '/employeemodule/comfirmation',
      },
      {
        title: 'Promotion',
        link: '/employeemodule/promotion',
      },
    ]
  },
  {
    title: 'Leave Management',
    icon: '/assets/icons/LeaveManagement.jpg',
    children: [
      {
        title: 'Leave Plan',
        link: '/leave',
      },
      {
        title: 'Leave Type',
        link: '/leave/type',
      },
      {
        title: 'Leave History',
        link: '/leave/history',
      },
    ]
  },
  {
    title: 'Performance Management',
    link: '/',
    icon: '/assets/icons/PerformanceAppraisals.jpg',
  },
  {
    title: 'Disciplinary Management',
    link: '/',
    icon: '/assets/icons/DisciplinaryManagement.jpg',
  },
  {
    title: 'Onboarding',
    link: '/',
    icon: '/assets/icons/Onboarding.jpg',
  },
  {
    title: 'Time and Attendance',
    link: '/',
    icon: '/assets/icons/TimeandAttendance.jpg',
  },
  {
    title: 'CAREERS',
    group: true,
  },
  {
    title: 'Recruitment',
    link: '/',
    icon: '/assets/icons/recruitment.jpg',
  },
  {
    title: 'Career Succession',
    link: '/',
    icon: '/assets/icons/EmployeeManagement.jpg',
  },
  {
    title: 'Training',
    icon: '/assets/icons/Training.jpg',
    children: [
      {
        title: 'Training Dashboard',
        link: '/training/',
      },
      {
        title: 'Training Plans',
        link: '/training/plans',
      },
      {
        title: 'Training Requests',
        link: '/training/requests',
      },
      {
        title: 'Training Administration',
        link: '/training/administration',
      },
    ],
  },
  {
    title: 'Exit and Retirement',
    link: '/',
    icon: '/assets/icons/ExitandRetirement.jpg',
  },
  {
    title: 'Talent Management',
    link: '/',
    icon: '/assets/icons/TalentManagement.jpg',
  },
  {
    title: 'Manpower',
    link: '/',
    icon: '/assets/icons/Manpower.jpg',
  },
  {
    title: 'MESSAGING',
    group: true,
  },
  {
    title: 'Communications',
    icon: '/assets/icons/Communications.jpg',
    children: [
      {
        title: 'Email Log',
        link: '/communications',
      },
      {
        title: 'Email Template',
        link: '/communications/templates',
      },
      {
        title: 'Email Settings',
        link: '/communications/settings',
      },
    
    ],

  },
  {
    title: 'Request & Complaints',
    link: '/complaints',
    icon: '/assets/icons/RequestComplaints.jpg',
  },
  {
    title: 'OPERATIONS',
    group: true,
  },
  {
    title: 'Payroll',
    link: '/',
    icon: '/assets/icons/Payroll.jpg',
  },
  {
    title: 'Expenses',
    icon: '/assets/icons/Expenses.jpg',
    children: [
      {
        title: 'Expense Management',
        link:'/expenses/'
      },
      {
        title: 'Expense Type',
        link:'/expenses/type'
      },
      {
        title: 'Expense Request',
        link:'/expenses/request'
      },
      {
        title: 'Expense Report',
        link:'/expenses/request'
      }

    ]
  },
  {
    title: 'Loan & Disbursement',
    link: '/',
    icon: '/assets/icons/LoanDisbursement.jpg',
  },
  {
    title: 'Disbursement',
    icon: '/assets/icons/Disbursement.jpg',
    children: [
      {
        title: 'Analytics',
        link: '/disbursement',
      },
      {
        title: 'Budget',
        link: '/disbursement/budget',
      },
      {
        title: 'History',
        link: '/disbursement/disbursement/history',
      },
      {
        title: 'Request',
        link: '/disbursement/disbursement/requests',
      },
    

    ]
  },
  {
    title: 'Benefit Administration',
    link: '/',
    icon: '/assets/icons/BenefitAdministration.jpg',
  },
  {
    title: 'ACCOUNT & SETTINGS',
    group: true,
  },
  {
    title: 'Settings',
    link: '/',
    icon: '/assets/icons/settings.jpg',
  },

];
