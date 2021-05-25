import { JobApplicationSearch, RecruitmentJobApplicationServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicants-dashboard',
  templateUrl: './applicants-dashboard.component.html',
  styleUrls: ['./applicants-dashboard.component.scss']
})
export class ApplicantsDashboardComponent implements OnInit {

  pageTitle: string = 'Recent Listings';
  allJobsApplication: JobApplicationSearch [] = [];

  constructor(private jobService: RecruitmentJobApplicationServiceProxy) { }

  ngOnInit(): void {
  }

  toggle(event){

  }


  async fetchApplications(){
    const data = await this.jobService.fetchJobApplications(0,10,1).toPromise();
    if(!data.hasError){
      this.allJobsApplication = data.result;
    }
    }

}
