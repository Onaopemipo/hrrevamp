import { RecruitmentSettingServiceProxy, SalaryRanage, RecruitmentJobServiceProxy, JobDTO, Sector } from './../../_services/service-proxies';
import { IDTextViewModel, DataServiceProxy } from 'app/_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicant-module',
  templateUrl: './applicant-module.component.html',
  styleUrls: ['./applicant-module.component.scss']
})
export class ApplicantModuleComponent implements OnInit {
  sideMenuToggle: boolean = true;
  employmentTypeData: IDTextViewModel [] = [];
  jobLevelData: IDTextViewModel [] = [];
  industryData: Sector [] = [];
  salaryData: SalaryRanage [] = [];
  loading: boolean = false;
  allJobs:JobDTO [] = [];
  jobsCounter: number = 0

  constructor(private dataservice: DataServiceProxy, private settings: RecruitmentSettingServiceProxy,private job: RecruitmentJobServiceProxy,) { }

  ngOnInit(): void {
    this.getEmploymentTypes();
    this.getJobIndustry();
    this.getJobLevel();
    this.getSalary();
  }

  async getEmploymentTypes(){
    const data = await this.settings.getEmploymentTypes().toPromise();
      if(!data.hasError){
        this.employmentTypeData = data.result;
      }
    }

    async getJobLevel(){
      const data = await this.dataservice.getJobLevel().toPromise();
        if(!data.hasError){
          this.jobLevelData = data.result;
        }
      }

    async getJobIndustry(){
      const data = await this.dataservice.getSector().toPromise();
        if(!data.hasError){
          this.industryData = data.result;
        }
      }

    async getSalary(){
      const data = await this.dataservice.getSalaryRange().toPromise();
        if(!data.hasError){
          this.salaryData = data.result;
        }
      }

      fetchPostedJobs(){
        this.loading = true;
        this.job.getAllActiveJobs(undefined,undefined,undefined,undefined,undefined,undefined,1,10).subscribe( data => {
        this.loading = false;
        if(!data.hasError){
          this.allJobs = data.result;
          this.jobsCounter = data.totalRecord;
        }
      });
        
        }
    

      filterByLevel(filObj){
        // alert(filObj);
      }

      filterBySalary(filObj){
        
      }

      filterByIndustry(filObj){
      }

      filterByJobType(filObj){
      }

}
