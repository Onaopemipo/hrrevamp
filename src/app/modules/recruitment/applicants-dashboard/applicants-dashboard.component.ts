import { JobApplication, RecruitmentJobApplicationServiceProxy, RecruitmentJobServiceProxy, JobDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicants-dashboard',
  templateUrl: './applicants-dashboard.component.html',
  styleUrls: ['./applicants-dashboard.component.scss']
})
export class ApplicantsDashboardComponent implements OnInit {

  pageTitle: string = 'Recent Listings';
  allJobsApplication: JobApplication [] = [];
  allJobs:JobDTO [] = [];

  constructor(private jobService: RecruitmentJobApplicationServiceProxy, private job: RecruitmentJobServiceProxy) { }

  ngOnInit(): void {
    this.fetchApplications();
    this.fetchPostedJobs();
  }

  toggle(event){

  }

  async fetchApplications(){
    const data = await this.jobService.fetchJobApplications(0,10,1).toPromise();
    if(!data.hasError){
      this.allJobsApplication = data.result;
    }
    }

    async fetchPostedJobs(){
      const data = await this.job.getAllActiveJobs('','','',0,0,1,10).toPromise();
      if(!data.hasError){
        this.allJobs = data.result;
      }
    }

}
