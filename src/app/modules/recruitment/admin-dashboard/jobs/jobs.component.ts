import { Router } from '@angular/router';
import { DepartmentDTO, Certification, CommonServiceProxy, GetAllDepartmentsServiceProxy, IDTextViewModel, DataServiceProxy, State, JobRole } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { RecruitmentJobServiceProxy, ManageJobDTO, JobDTO, JobFilterDTO, Qualification, RecruitmentSettingServiceProxy, Country } from './../../../../_services/service-proxies';
import { TableAction, TableActionEvent, TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

enum TP  {
VIEW ='1',DELETE = '2'
}

enum TABS {
  postedJobs, scheduledJobs, draftedJobs
}

@Component({
  selector: 'ngx-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  TABS = TABS;
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  showModal = false

  showCvModal = false
  showdeleteModal = false

  myPlanHeader: string = 'You have not posted any Job';
  myPlanDesc: string = 'Click on the button to post a job';

  myButton: string = 'Add a Job Posting';
  availability: string = 'Physical';
  employmentType: string = 'Full Time';
  newJob: boolean = false;
  allJobs: JobDTO []= [];
  jobFilter: JobFilterDTO;
  jobsCounter: number = 4;
  allDepartments: DepartmentDTO [] = [];
  certificationData: Certification [] = [];
  qualificationData: Qualification [] = [];
  employmentTypes: IDTextViewModel []= [];
  jobAvailability: IDTextViewModel []= [];
  allCountries: Country [] = [];
  allStates: State [] = [];
  allJobRoles: JobRole [] = [];
  singleJob: JobDTO = new JobDTO;
  tableData: string = '';

  rButton = [
    {name: 'a', label: 'Add New', icon: 'plus'},
  ]

  postedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'applicants', title: 'Applicants'},
    {name: 'datePosted', title: 'Date Posted'},
    {name: 'status', title: 'Status'},
  ];
data = [
  {jobTitle: 'jobTitle', department: 'technical ', applicants:'developer',datePosted : '02/03/2021',status:'status'}
]
tableActions: TableAction[] = [
  {name: TP.VIEW, label: 'View'},
{name: TP.DELETE, label: 'Delete'},
]

  scheduledJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'scheduledDate', title: 'Scheduled Date'},
  ];



  draftedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
  ];

  getTableActions (){
    if(TABS.postedJobs){
      this.tableActions = [{name: 'posted', label:'Posted'},
      {name: 'disburse', label:'Disburse'},
    ]
    } else if(TABS.scheduledJobs){
      this.tableActions = [{name: 'view', label:'View'},
      // {name: 'disburse', label:'Disburse'},
    ]
    } else if(TABS.draftedJobs){
      this.tableActions = [{name: 'view', label:'View'},
      // {name: 'disburse', label:'Disburse'},
    ]
    }
  }

  selectedTab = TABS.postedJobs;

  selectedOption;
  loading: boolean;
  newJobModel: ManageJobDTO = new ManageJobDTO();

  constructor(private job: RecruitmentJobServiceProxy, private alertMe: AlertserviceService,
    private commonService: CommonServiceProxy, private department: GetAllDepartmentsServiceProxy,
    private employment: RecruitmentSettingServiceProxy, private dataService: DataServiceProxy,
    private common: CommonServiceProxy, private router: Router ) {
   }

  ngOnInit(): void {
    this.fetchAllJobs();
    this.fetchEmploymentTypes();
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  newJobPosting(){
    this.router.navigateByUrl('/recruitmentadmin/newjob');
  }
  addNewJob() {
    this.loading = true;
   this.job.addUpdateJob(this.newJobModel).subscribe(data => {
    if(!data.hasError){
      this.loading = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss').subscribe(res => {
        if(res){

        }
      })
    }
   })
  }

  deleteJob(){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '','Yes').subscribe(res => {
      if(res){
        this.job.deleteJob(1).subscribe(data => {
          if(!data.hasError){
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Job Deleted!', 'Dismiss');
          }
        })
      }
    })
  }

  async fetchCountries(){
    const data = await this.dataService.getCountries().toPromise();
    if(!data.hasError){
      this.allCountries = data.result;
    }
  }

  async fetchStates(){
    const data = await this.dataService.getStateByCountryId(1).toPromise();
    if(!data.hasError){
      this.allStates = data.result;
    }
  }

  async fetchJobRoles(){
    const data = await this.common.getJobRoles().toPromise();
    if(!data.hasError){
      this.allJobRoles = data.result;
    }
  }

  async fetchJobAvailabilty(){
    const data = await this.employment.getJobAvailabilities().toPromise();
    if(!data.hasError){
      this.jobAvailability = data.result;
    }
  }


  async fetchQualifications(){
    const data = await this.commonService.getQualifications().toPromise();
    if(!data.hasError){
      this.qualificationData = data.result;
      console.log('qualification:', this.qualificationData)
    }
  }

  async fetchEmploymentTypes(){
    const data = await this.employment.getEmploymentTypes().toPromise();
    if(!data.hasError){
      this.employmentTypes = data.result;
    }
  }

  async fetchAllDepartments(){
    const data = await this.department.getAllDepartments(10,1).toPromise();
    if(!data.hasError){
      this.allDepartments = data.result;
      console.log('All Departments:',this.allDepartments)
    }
  }

  async fetchSingleJob(){
    const data = await this.job.getJob(1).toPromise()
      if(!data.hasError){
        this.singleJob = data.result;
      }
  }

  fetchAllJobs(){
    this.job.getAllJobs(this.jobFilter).subscribe(data => {
      if(!data.hasError){
        this.allJobs = data.result;
        this.jobsCounter = data.totalRecord;
      }
    })
  }

  actionClicked(event: TableActionEvent){
    if (event.name === TP.VIEW){
      this.showCvModal = true
    }

    if (event.name === TP.DELETE){
      this.showdeleteModal = true
    }

  }
  showMasterSearchModal(){
    this.showModal = true
  }
}
