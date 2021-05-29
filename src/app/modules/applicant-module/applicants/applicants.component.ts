import { Router } from '@angular/router';
import { RecruitmentJobApplicationServiceProxy, RecruitmentJobServiceProxy, JobApplicationSearch, JobDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  pageTitle: string = 'Recent Listings';
  allJobsApplication: JobApplicationSearch [] = [];
  allJobs:JobDTO [] = [];
  jobsCounter: number = 0
  loading: boolean = false;
  noJobsHeader: string = 'There is no job at the moment';
  noJobs: string = 'Please check back later';
  constructor(private jobService: RecruitmentJobApplicationServiceProxy, private job: RecruitmentJobServiceProxy, private router: Router) { }

  ngOnInit(): void {
    // this.fetchApplications();
    this.fetchPostedJobs;
  }

  myProfle() {

  }

  fetchPostedJobs(){
      this.job.getAllActiveJobs(10,1).subscribe(data => {
        if(!data.hasError){
          this.allJobs = data.result;
          this.jobsCounter = data.totalRecord;
        }
      });

    }

    jobDetails(id){
      this.router.navigateByUrl('/recruitment/jobdetails/'+ id);
    }
}
