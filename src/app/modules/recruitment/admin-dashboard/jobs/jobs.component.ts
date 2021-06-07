import { ColumnTypes } from 'app/components/tablecomponent/models';
import { IStatus, MyColor } from './../../../../components/status/models';
import { Router } from '@angular/router';
import { DepartmentDTO, Certification, CommonServiceProxy, GetAllDepartmentsServiceProxy, IDTextViewModel, DataServiceProxy, State, JobRole } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { RecruitmentJobServiceProxy, ManageJobDTO, JobDTO, Qualification, RecruitmentSettingServiceProxy, Country, Currency, QuizDTO, RecruitmentScoreCard, RecruitmentQuizServiceProxy } from './../../../../_services/service-proxies';
import { TableAction, TableActionEvent, TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

enum TP  {
VIEW ='1',DELETE = '2'
}

enum draftEnum  {
  EDIT ='1',DELETE = '2',POST = '3'
  }

enum TABS {
  postedJobs, scheduledJobs, draftedJobs
}

export class JobWithStatus extends JobDTO implements IStatus {
  jobStatus: JobDTO;

  constructor(jobStatus: JobDTO) {
    super(jobStatus);
    this.jobStatus = jobStatus;

  }

  get status() {
    return this.jobStatus.isActive;
}
  getStatusLabel() {
    if (this.jobStatus.isActive === true) return 'Open';
    if (this.jobStatus.isActive === false) return 'closed';
  }
  getStatusColor() {
    if (this.jobStatus.isActive === true) return new MyColor(33,150,83);
    if (this.jobStatus.isActive === false) return new MyColor(242, 153, 74);
    return new MyColor(242, 0, 74);
 }
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
  allDraftJobs: JobDTO []= [];
  jobsCounter: number = 0;
  allDepartments: DepartmentDTO [] = [];
  certificationData: Certification [] = [];
  qualificationData: Qualification [] = [];
  employmentTypes: IDTextViewModel []= [];
  jobAvailability: IDTextViewModel []= [];
  allCountries: Country [] = [];
  allStates: State [] = [];
  allJobRoles: JobRole [] = [];
  singleJob: JobDTO = new JobDTO().clone();
  tableData: string = '';
  allCurrencies: Currency [] = [];
  scheduledCounter: number = 0;
  draftCounter: number = 0;
  allQuizes: QuizDTO [] = [];
  allScoreCards: RecruitmentScoreCard [] = [];

  rButton = [
    {name: 'a', label: 'Add New', icon: 'plus'},
  ]

  postedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'availability', title: 'Availability'},
    {name: 'experience', title: 'Experience(Months)'},
    {name: 'postValidityTo', title: 'Valid To', type: ColumnTypes.Date},
    {name: 'isActive', title: 'Status', type: ColumnTypes.Status},
  ];

  scheduledJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'scheduledDate', title: 'Scheduled Date'},
  ];

  draftedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
  ];

tableActions: TableAction [] = [
  {name: TP.VIEW, label: 'View'},
{name: TP.DELETE, label: 'Delete'},
]

draftTableActions: TableAction [] = [
  {name: draftEnum.EDIT, label: 'Edit'},
  {name: draftEnum.POST, label: 'Post'},
  {name: draftEnum.DELETE, label: 'Delete'},
]

tableActionClicked(event: TableActionEvent){
  if(event.name==TP.VIEW){
    this.showJob = true;
    this.job.getJob(event.data.id).subscribe(data => {
      if(!data.hasError){
        this.singleJob = data.result;
      }
    })
    }

    else if(event.name==TP.DELETE){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '','Yes').subscribe(dataAction => {
      if(dataAction){
        this.job.deleteJob(event.data.id).subscribe(data => {
          if(!data.hasError){
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successfully Deleted', 'Dismiss').subscribe(res => {
              this.fetchAllJobs();
              this.router.navigateByUrl('/recruitmentadmin/jobs');
            })
          }
        })
      }
    })
      }
}

draftTableActionClicked(event: TableActionEvent){
  if(event.name==draftEnum.EDIT){


    }

    else if(event.name==draftEnum.DELETE){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '','Yes').subscribe(dataAction => {
      if(dataAction){
        this.job.deleteJob(event.data.id).subscribe(data => {
          if(!data.hasError){
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successfully Deleted', 'Dismiss').subscribe(res => {
              this.router.navigateByUrl('/recruitmentadmin/jobs');
            })
          }
        })
      }
    })
      }
      else if(event.name == draftEnum.POST){
        this.job.toggleJob(event.data.id).subscribe(data => {
          if(!data.hasError){
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Dismiss')
          }
        })
      }
}

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
  showJob: boolean = false;
  newJobModel: ManageJobDTO = new ManageJobDTO();

  constructor(private job: RecruitmentJobServiceProxy, private alertMe: AlertserviceService,
    private commonService: CommonServiceProxy, private department: GetAllDepartmentsServiceProxy,
    private employment: RecruitmentSettingServiceProxy, private dataService: DataServiceProxy,
    private common: CommonServiceProxy, private router: Router,private quiz: RecruitmentQuizServiceProxy ) {
   }

  ngOnInit(): void {
    this.fetchAllJobs();
    this.fetchEmploymentTypes();
    this.fetchAllDraft();
    this.fetchAllDepartments();
    this.fetchCountries();
    this.fetchEmploymentTypes();
    this.fetchQualifications();
    this.fetchAllQuizes();
    this.fetchJobRoles();
    this.fetchJobAvailabilty();
    this.fetchScoreCards();
    this.fetchCurrency();
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  newJobPosting(){
    this.router.navigateByUrl('/recruitmentadmin/newjob');
  }
  updateJob() {
    this.loading = true;
    this.newJobModel.id = this.singleJob.id;
    this.newJobModel.jobTitleId = this.singleJob.jobTitleId;
    this.newJobModel.maxQualificationId = this.singleJob.maxQualificationId;
    this.newJobModel.maxSalary = this.singleJob.maxSalary;
    this.newJobModel.minQualificationId = this.singleJob.minQualificationId;
    this.newJobModel.minSalary = this.singleJob.minSalary;
    this.newJobModel.postValidityFrom = this.singleJob.postValidityFrom;
    this.newJobModel.postValidityTo = this.singleJob.postValidityTo;
    this.newJobModel.requirements = this.singleJob.requirements;
    this.newJobModel.scoreCardId = this.singleJob.scoreCardId;
    this.newJobModel.stateId = this.singleJob.stateId;
    this.newJobModel.countryId = this.singleJob.countryId;
   this.job.addUpdateJob(this.newJobModel).subscribe(data => {
    if(!data.hasError){
      this.loading = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss').subscribe(res => {
        if(res){
          this.router.navigateByUrl('/recruitmentadmin/jobs');
          this.fetchAllJobs();
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
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Job Deleted!', 'Dismiss').subscribe(res => {
              if(res){
                this.router.navigateByUrl('/recruitmentadmin/jobs');
                this.fetchAllJobs();
              }
            });
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

  async fetchJobRoles(){
    const data = await this.common.getJobRoles().toPromise();
    if(!data.hasError){
      this.allJobRoles = data.result;
    }
  }

  async fetchCurrency(){
    const data = await this.commonService.getCurrency().toPromise()
    if(!data.hasError){
      this.allCurrencies = data.result;
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

  async fetchAllJobs(){
    this.loading = true;
   const data = await this.job.getAllJobs(undefined, undefined, 1,10).toPromise();
   this.loading = false;
    if(!data.hasError){
      this.allJobs = data.result.map(x => new JobWithStatus(x));
      this.jobsCounter = data.totalRecord;
      console.log('My Jobs:',this.allJobs)
   }
  }

  async fetchAllDraft(){
    this.loading = true;
    const data = await this.job.getAllJobs(true, undefined, 1,10).toPromise();
    this.loading = false;
    if(!data.hasError){
      this.allDraftJobs = data.result.map(x => new JobWithStatus(x));
      this.draftCounter = data.totalRecord;
      console.log('My Jobs:',this.allDraftJobs)
   }
  }

  async fetchScheduledJobs(){
    this.loading = true;
    const data = await this.job.getAllJobs(undefined, true, 1,10).toPromise();
    this.loading = false;
    if(!data.hasError){
      this.allDraftJobs = data.result.map(x => new JobWithStatus(x));
      this.scheduledCounter = data.totalRecord;
      console.log('My Jobs:',this.allDraftJobs)
   }
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

  async fetchScoreCards(){
    const data = await this.employment.getRecruitmentScoreCards().toPromise();
    if(!data.hasError){
      this.allScoreCards = data.result
    }
   }

   async fetchAllQuizes(){
    const data = await this.quiz.getAllQuizzes().toPromise();
    if(!data.hasError){
      this.allQuizes = data.result;
    }
  }

  fetchStates(countryId){
  this.dataService.getStateByCountryId(countryId).subscribe(data => {
    if(!data.hasError){
      this.allStates = data.result;
    }
  });

  }

   getSelectedEmployee(event,selectType) {
     if(selectType == 'employee'){
      this.newJobModel.reviewers = event[0].employeeNumber;
     }
  }

}
