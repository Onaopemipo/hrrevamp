import { ActivatedRoute } from '@angular/router';
import { RecruitmentJobServiceProxy, JobDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  jobId: number = 0;
  jobDetails: JobDTO = new JobDTO().clone();
  applicationDetails: JobDTO = new JobDTO();
  constructor(private job: RecruitmentJobServiceProxy, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.jobId = Number(this.router.snapshot.paramMap.get("id"));
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

}
