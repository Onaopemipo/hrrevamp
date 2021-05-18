import { AlertserviceService } from './../../../../_services/alertservice.service';
import { Router } from '@angular/router';
import { CommonServiceProxy, DataServiceProxy, GetAllDepartmentsServiceProxy, DepartmentDTO, Certification, IDTextViewModel, State, JobRole } from 'app/_services/service-proxies';
import { RecruitmentJobServiceProxy, RecruitmentSettingServiceProxy, Country, JobDTO, JobFilterDTO, Qualification, ManageJobDTO, RecruitmentScoreCard } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-newjob',
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.scss']
})
export class NewjobComponent implements OnInit {

  myButton: string = 'Add a Job Posting';
  availability: string = 'Physical';
  employmentType: string = 'Full Time';
  newJob: boolean = false;
  allJobs: JobDTO []= [];
  jobFilter: JobFilterDTO;
  jobsCounter: number = 0;
  allDepartments: DepartmentDTO [] = [];
  certificationData: Certification [] = [];
  qualificationData: Qualification [] = [];
  employmentTypes: IDTextViewModel []= [];
  jobAvailability: IDTextViewModel []= [];
  allCountries: Country [] = [];
  allStates: State [] = [];
  allJobRoles: JobRole [] = [];
  singleJob: JobDTO = new JobDTO;
  loading: boolean;
  showModal: boolean = true;
  newJobModel: ManageJobDTO = new ManageJobDTO();
  allScoreCards: RecruitmentScoreCard [] = [];

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  constructor(private job: RecruitmentJobServiceProxy, private alertMe: AlertserviceService,
    private commonService: CommonServiceProxy, private department: GetAllDepartmentsServiceProxy,
    private employment: RecruitmentSettingServiceProxy, private dataService: DataServiceProxy,
    private common: CommonServiceProxy, private router: Router ) {
   }

  ngOnInit(): void {
    this.fetchAllDepartments();
    this.fetchCountries();
    this.fetchEmploymentTypes();
    this.fetchQualifications();
    this.fetchStates();
    this.fetchJobRoles();
    this.fetchJobAvailabilty();
  }

  newJobPosting(){
    this.router.navigateByUrl('/recruitmentadmin/newjob');
  }
  addNewJob() {
    this.loading = true;
    this.newJobModel.locationId = 1;
   this.job.addUpdateJob(this.newJobModel).subscribe(data => {
    if(!data.hasError && data.result.isSuccessful == true){
      this.loading = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss').subscribe(res => {
        if(res){

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
    const data = await this.dataService.getStateByCountryId(154).toPromise();
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

  async fetchScoreCards(){
   const data = await this.employment.getRecruitmentScoreCards().toPromise();
   if(!data.hasError){
     this.allScoreCards = data.result
   }
  }

  getSelectedEmployee(event,selectType) {
    if(selectType == 'employee'){
     this.newJobModel.reviewers = event[0].employeeNumber;
    }
 }

}
