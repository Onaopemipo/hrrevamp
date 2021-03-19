import { AddUpdateExpenseProjectServiceProxy, ExpenseProject, IExpenseProject, ExpenseProjectDto, MessageOut, AddUpdateLoanTypeServiceProxy, ExpenseTypeDto, FetchExpensesServiceProxy, GetExpenseProjectServiceProxy, ExpenseGroup, GetExpenseTypesServiceProxy, ExpenseType } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { NgForm } from '@angular/forms';

enum TABS { PROJECTS, TYPES, }
enum TOP_ACTIONS { CREATE_NEW, }

@Component({
  selector: 'ngx-expense-management',
  templateUrl: './expense-management.component.html',
  styleUrls: ['./expense-management.component.scss']
})
export class ExpenseManagementComponent extends MainBaseComponent {
  topActionButtons = [
    { name: 'CREATE_NEW', label: 'Create new', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.PROJECTS;
  tableColumns = [
    { name: 'date', title: 'REF ID' },
    { name: 'date', title: 'Name' },
    { name: 'date', title: 'Start Date' },
    { name: 'date', title: 'End Date' },
    { name: 'date', title: 'Status' }
  ];

  allProjects: ExpenseProjectDto = new ExpenseProjectDto().clone();
  myexpense: ExpenseTypeDto;
  myProjects: ExpenseGroup [] = [];
  myTypes: ExpenseType [] = [];

  newProject: NgForm;



  constructor(private project: AddUpdateExpenseProjectServiceProxy, private types: AddUpdateLoanTypeServiceProxy,
    private getmyproject: GetExpenseProjectServiceProxy, private getmytype: GetExpenseTypesServiceProxy  ) {
    super();
  }


  ngOnInit(): void {
    // this.getProjects();
    this.getProjects();
    this.getTypes();
  }

  // async getProjects(){
  //  let response = await this.project.addUpdateExpenseProject(this.allProjects).toPromise();
  //   this.myProject.push(response.result);
  //   console.log('Yesssss',this.myProject)
  // }

  createProject(){
    this.project.addUpdateExpenseProject(this.allProjects).subscribe(data => {
      if(!data.hasError){
        // this.myProject.push(data.result);
        console.log('suceess')
      }
      else {
        console.log('oops!!!')
      }
    })
  }

  createTypes(){
    this.types.addUpdateExpenseType(this.myexpense).subscribe(data => {
      if(!data.hasError){
        console.log('Success')
      }
      else {
        console.log('Oops! Something')
      }
    })
  }

  getProjects(){
    this.getmyproject.getExpenseProject(1,'','',true,'','',1,1).subscribe(data => {
      if(!data.hasError){
        this.myProjects = data.result;
        console.log('Hey See here', this.myProjects)
      }
    })
  }

  getTypes(){
this.getmytype.getExpenseTypes(0,'','','','','',1,1).subscribe(data => {
if(!data.hasError){
  this.myTypes = data.result;
  console.log('Hey See here', this.myTypes)
}
})
  }
}
