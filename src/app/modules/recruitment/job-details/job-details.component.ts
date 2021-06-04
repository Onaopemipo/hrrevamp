import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ActivatedRoute } from '@angular/router';
import { RecruitmentJobServiceProxy, JobDTO, RecruitmentJobApplicationServiceProxy, ApplyForJobDto } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  jobId: number = 0;
  applicantId: number = 1;
  checkStatus: boolean = false;
  jobDetails: JobDTO = new JobDTO().clone();
  applicationDetails: JobDTO = new JobDTO();
  application: ApplyForJobDto = new ApplyForJobDto();
  constructor(private job: RecruitmentJobServiceProxy, private apply: RecruitmentJobApplicationServiceProxy,
     private route: ActivatedRoute, private alertMe: AlertserviceService, private router: Router) { }

  ngOnInit(): void {
    // this.jobId = Number(this.route.snapshot.paramMap.get("id"));
    this.job.getJob(this.jobId = Number(this.route.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.jobDetails = data.result;
      }
    })
  }

  fetchJobDetails(){
    this.job.getJob(this.jobId).subscribe(data => {
      if(!data.hasError){
        this.jobDetails = data.result;
      }
    })
  }

  getJobApplication(){
    this.job.getJobByApplicationId(this.jobId).subscribe(data => {
      if(!data.hasError){
        this.applicationDetails = data.result;
      }
    })
  }

  getAuthuser(){

  }

  applyForJob(){
    this.application.applicantId = this.applicantId;
    this.application.jobId = this.jobId;
    this.apply.applyForJob(this.application).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successful', 'Go to Job Portal').subscribe(res => {
          this.router.navigateByUrl('')
        })
      }
    })
  }

}
