import { JobApplication } from './../../../../_services/service-proxies';
import { TableColumn, ColumnTypes } from 'app/components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { RecruitmentJobApplicationServiceProxy } from 'app/_services/service-proxies';

enum ACTIONS {
  VIEW_PROFILE='1', DOWNLOAD_CV='2'
}
@Component({
  selector: 'ngx-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  myPlanHeader: string = 'You have not posted any application';
  myPlanDesc: string = 'Check back later';

  applicantsTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'dateApplied', title: 'Date Applied'},
    {name: ACTIONS.VIEW_PROFILE, title: '', type: ColumnTypes.Link, link_name: 'View Profile'},
    {name: ACTIONS.DOWNLOAD_CV, title: '', type: ColumnTypes.Link, link_name: 'View CV'}
  ];

  allApplications: JobApplication [] = [];
  applicationCounter: number = 0;

  constructor(private jobs: RecruitmentJobApplicationServiceProxy) { }

  ngOnInit(): void {
  }

  async fetchAllApplications(){
    const data = await this.jobs.fetchJobApplications(undefined, undefined, undefined,undefined,1,10).toPromise();
    if(!data.hasError){
      this.allApplications = data.result;
      this.applicationCounter = data.totalRecord;
    }
  }

}
