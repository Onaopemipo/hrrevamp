import { NbMenuItem } from '@nebular/theme';
import { title } from 'process';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Home',
    icon: 'assets/icons/home.jpg',
    link: '/dashboard',


  },

  {
    title: 'CORE HR',
    group: true,
  },

  {
    title: 'Employee Self Service',
    icon: 'assets/icons/EmployeeManagement.jpg',
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
        link: '/employeemodule/viewemployeerecords',
      },
      {
        title: 'My Leave',
        link: '/myleave',
      },
      {
        title: 'Exit Process',
        link: '/employeemodule/exitwarning',
      },
      {
        title: 'Deployment Application',
        link: '/employeemodule/deploymentapplication',
      },
    ],
  },
  {
    title: 'Employee Management',
    icon: 'assets/icons/EmployeeManagement.jpg',
    children: [

      {
        title: 'Confirmation',
        link: '/employeemodule/confirmation',
      },
      {
        title: 'Promotion',
        link: '/employeemodule/promotion',
      },
      {
        title: 'Employee Records',
        link: '/employeemodule/employeerecords',
      },
      {
        title: 'Employee Deployment',
        link: '/employeemodule/employeedeployment',
      },

    ]
  },



  {
    title: 'Leave Management',
    icon: 'assets/icons/LeaveManagement.jpg',
    children: [
      {
        title: 'Leave Plan',
        link: '/leave/plan',
      },
      {
        title: 'Leave Type',
        link: '/leave/type',
      },
      {
        title: 'Leave History',
        link: '/leave/history',
      },
      {
        title: 'Leave Year',
        link: '/leave/leaveyear',
      },
      {
        title: 'Leave Entitlement',
        link: '/leave/leaveentitlement',
      },
      {
        title: 'Leave Holiday',
        link: '/leave/leaveholidays',
      },
    ]
  },
  {
    title: 'Performance Management',
    link: '/',
    icon: 'assets/icons/PerformanceAppraisals.jpg',
    children: [
      {
        title: 'Dashboard',
        link: '/performance'
      },
      {
        title: 'Cycle',
        link: '/performance/cycle'
      },
      {
        title: 'Key Result Area',
        link: '/performance/kra'
      },
      {
        title: 'Appraisal',
        link: '/performance/appraisals'
      },
      {
        title: 'Rating',
        link: '/performance/rating'
      },
      {
        title: 'Score Card',
        link: '/performance/score-card'
      },
    ]
  },
  {
    title: 'Disciplinary Management',
    link: '/',
    icon: 'assets/icons/DisciplinaryManagement.jpg',
    children: [
      {
        title: 'Settings',
        link: '/discipline'
      },
      {
        title: 'Log',
        link: '/discipline/log'
      },
    ]
  },
  {
    title: 'Onboarding',
    icon: 'assets/icons/Onboarding.jpg',
    children: [
      {
        title: 'Onboarding Dashboard',
        link: '/employeemodule',
      },
      {
        title: 'Onboarding Employees',
        link: '/employeemodule/allemployees',
      },
    ]
  },
  {
    title: 'Time and Attendance',
    icon: 'assets/icons/TimeandAttendance.jpg',
    children: [
      {
        title: 'Analytics',
        link: '/timeandattendance'
      },
      {
        title: 'Projects',
        link: ''
      },
      {
        title: 'Shift',
        link: ''
      }
    ]
  },
  {
    title: 'Events',
    icon: 'assets/icons/TimeandAttendance.jpg',
    link: '/self-service/employeeevents'
  },
  {
    title: 'CAREERS',
    group: true,
  },
  {
    title: 'Recruitment',
    link: '/',
    icon: 'assets/icons/recruitment.jpg',
  },
  {
    title: 'Training',
    icon: 'assets/icons/Training.jpg',
    children: [
      {
        title: 'Training Dashboard',
        link: '/training/',
      },
      {
        title: 'Training Categories',
        link: '/training/categories/',
      },
      {
        title: 'Training Specializations',
        link: '/training/specializations/',
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
    icon: 'assets/icons/ExitandRetirement.jpg',
    children: [
      {
        title: 'Exit',
        link: '/employeemodule/exitmanagement/exit',
      },
      {
        title: 'Retirements',
        link: '/employeemodule/exitmanagement/retirement',
      },
    ]
  },
  {
    title: 'Career Succession',
    icon: 'assets/icons/career.jpg',
    children: [
      {
        title: 'Dashboard',
        link: 'career-succession/dashbaord',
      },

      {
        title: 'Competency',
        link: 'career-succession/competency',
      },

      {
        title: 'Succession Plans',
        link: 'career-succession/planning',
      },
      {
        title: '9 Box Grid Appraisal',
        link: 'career-succession/gridbox',
      },

      {
        title: 'Roles',
        link: 'career-succession/roles',
      },

      {
        title: 'Succcession Dashboard',
        link: 'career-succession/succession-dashboard',
      },

      {
        title: 'Report',
        link: 'career-succession/report',
      },
    ]
  },
  {
    title: 'Talent Management',
    link: '/career-succession/talent-pool',
    icon: 'assets/icons/TalentManagement.jpg',
  },
  {
    title: 'Manpower',
    icon: 'assets/icons/Manpower.jpg',
    children: [
      {
        title: 'Capacity Planning',
        link: '/manpower/capacityplanning'
      },
      {
        title: 'Projection Report',
        link: '/manpower/projectionreport'
      }
    ]
  },
  {
    title: 'MESSAGING',
    group: true,
  },
  {
    title: 'Communications',
    icon: 'assets/icons/Communications.jpg',
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
    icon: 'assets/icons/RequestComplaints.jpg',
  },
  {
    title: 'OPERATIONS',
    group: true,
  },
  {
    title: 'Payroll',
    icon: 'assets/icons/Payroll.jpg',
    children: [
      {
        title: 'Institution Management',
        link: 'payrpll/institutionalmanagement'
      },
      {
        title: 'Pay Elements',
        link:'/'
      },
      {
        title: 'Pay Scale',
        link:'/'
      },
      {
        title: 'Quick Payroll',
        link:'/'
      },
      {
        title: 'Payroll Run Log',
        link:'/'
      },
      {
        title: 'Report',
        link:'/'
      },
    ]
  },
  {
    title: 'Expenses',
    icon: 'assets/icons/Expenses.jpg',
    children: [
      {
        title: 'Expense Management',
        link: '/expenses/'
      },
      {
        title: 'Expense Type',
        link: '/expenses/type'
      },
      {
        title: 'Expense Request',
        link: '/expenses/request'
      },
      {
        title: 'Expense Report',
        link: '/expenses/report'
      }

    ]
  },
  {
    title: 'Loan',
    icon: 'assets/icons/LoanDisbursement.jpg',
    children: [
      {
        title: 'Loan Request',
        link: "/loan"
      },

      {
        title: 'Loan Type',
        link:"/loan/loan-type"
      },

      {
        title: 'Interest Type',
        link:"/loan/interest-type"
      },
    ]
  },
  {
    title: 'Disbursement',
    icon: 'assets/icons/Disbursement.jpg',
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
    icon: 'assets/icons/BenefitAdministration.jpg',
  },
  {
    title: 'ACCOUNT & SETTINGS',
    group: true,
  },
  {
    title: 'Settings',
    link: '/',
    icon: 'assets/icons/settings.jpg',
    children: [
      {title: 'Department', link: '/setup/department'},
      {title: 'Location', link: '/setup/location'},
      {title: 'Position', link: '/setup/position'},
      {title: 'Job Role', link: '/setup/job-role'},
      {title: 'Salary Scale', link: '/setup/salary-scale'},
      {title: 'Request Type', link: '/setup/request'},
      // {title: 'Events', link: '/setup/event'},
    ]
  },

];
