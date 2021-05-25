import { RecruitmentJobApplicationServiceProxy, JobApplicationSearch } from './../../../../_services/service-proxies';
import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'applicants', title: 'Applicants'},
    {name: 'datePosted', title: 'Date Posted'},
    {name: 'status', title: 'Status'},
  ];

  allJobsApplication: JobApplicationSearch [] = [];
  constructor(private jobService: RecruitmentJobApplicationServiceProxy) { }

  ngOnInit(): void {
  }


  async fetchApplications(){
  const data = await this.jobService.fetchJobApplications('','','',0,'',0,undefined,false,'',0,0,0,0).toPromise();
  if(!data.hasError){
    this.allJobsApplication = data.result;
  }
  }

}
