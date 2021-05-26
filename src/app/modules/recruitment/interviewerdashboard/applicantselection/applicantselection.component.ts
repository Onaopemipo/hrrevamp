import { JobApplication, RecruitmentJobApplicationServiceProxy } from './../../../../_services/service-proxies';
import { ColumnTypes, TableActionEvent, TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

enum ACTIONS {
  VIEW_PROFILE='1', VIEW_CV='2'
}
@Component({
  selector: 'ngx-applicantselection',
  templateUrl: './applicantselection.component.html',
  styleUrls: ['./applicantselection.component.scss']
})
export class ApplicantselectionComponent implements OnInit {

  showModal = false
  showCvModal;
  allJobRoles: JobApplication [] = [];

  myApplicantTable: TableColumn [] = [
    {name: 'name', title: 'Name', type: ColumnTypes.Text},
    {name: 'email', title: 'Email'},
    {name: 'role', title: 'Role'},
    {name: 'dateApplied', title: 'Date Applied', type: ColumnTypes.Date},
    {name: ACTIONS.VIEW_PROFILE, title: '', type: ColumnTypes.Link, link_name: 'View Profile'},
    {name: ACTIONS.VIEW_CV, title: '', type: ColumnTypes.Link, link_name: 'View CV'}
  ];
  data = [
    {name: 'Name', email: 'Email', role:'Job Title',dateApplied : '02/03/2021'}
  ]
  constructor(private jobService: RecruitmentJobApplicationServiceProxy) { }

  ngOnInit(): void {
  }

  tableActionClick(actionData: TableActionEvent){
    if(actionData.name === ACTIONS.VIEW_PROFILE){
      this.showModal = true
    }
    if(actionData.name === ACTIONS.VIEW_CV){
    this.showCvModal = true
    }
  }

  async fetchJobRoles(){
    const data = await this.jobService.fetchJobApplicationByRole(0,10,1).toPromise();
    if(!data.hasError){
      this.allJobRoles = data.result;
    }
  }



}
