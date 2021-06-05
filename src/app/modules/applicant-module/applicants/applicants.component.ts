import { IVwUserObj } from 'app/_services/service-proxies';
import { AuthenticationService } from 'app/_services/authentication.service';
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
  user: IVwUserObj;

  constructor(private jobService: RecruitmentJobApplicationServiceProxy, private job: RecruitmentJobServiceProxy,
    private router: Router, private route: ActivatedRoute, private authServ: AuthenticationService) { }

  ngOnInit(): void {
    this.applicantId = Number(this.route.snapshot.paramMap.get("id"));
    this.fetchPostedJobs();
  }

  myProfle() {

  }

  fetchPostedJobs(){
    this.loading = true;
    this.job.getAllActiveJobs('','','',0,0,0,1,10).subscribe( data => {
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

    async getLoggedInUser(){
      this.authServ.getuser().then(async (users: IVwUserObj[])=> {
        if (users) {
          if (users.length > 0) {
            this.user = users[0];
            console.log('My user is here',this.user)
    }
    }
    })
  
    }
}
