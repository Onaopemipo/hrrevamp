import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RecruitmentJobApplicationServiceProxy, RecruitmentJobServiceProxy, JobApplication, JobDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  pageTitle: string = 'Recent Listings';
  allJobsApplication: JobApplication [] = [];
  allJobs:JobDTO [] = [];
  jobsCounter: number = 0
  loading: boolean = false;
  noJobsHeader: string = 'There is no job at the moment';
  noJobs: string = 'Please check back later';
  applicantId:number = 0;

  constructor(private jobService: RecruitmentJobApplicationServiceProxy, private job: RecruitmentJobServiceProxy,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.applicantId = Number(this.route.snapshot.paramMap.get("id"));
    this.fetchPostedJobs();
  }

  myProfle() {

  }

  fetchPostedJobs(){
    this.loading = true;
    this.job.getAllActiveJobs(1,10).subscribe( data => {
    this.loading = false;
    if(!data.hasError){
      this.allJobs = data.result;
      this.jobsCounter = data.totalRecord;
    }
  });
    
    }

    jobDetails(id){
      this.router.navigateByUrl('/recruitment/jobdetails/'+ id);
    }

    gotoProfile(){
      this.router.navigateByUrl('/recruitment/profile/'+ this.applicantId);
    }
}
