import { NbTabComponent } from '@nebular/theme';
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
    { name: 'CREATE_NEW', label: 'Add Project', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.PROJECTS;
  tableColumns = []
  get _tableColumns(){
    if(this.selectedTab === TABS.PROJECTS){
      return  [
        { name: 'date', title: 'REF ID' },
        { name: 'date', title: 'Name' },
        { name: 'date', title: 'Start Date' },
        { name: 'date', title: 'End Date' },
        { name: 'date', title: 'Status' }
      ];
    }
    return [
    { name: 'date', title: 'REF ID' },
    { name: 'date', title: 'Name' },
    { name: 'date', title: 'Sub-Type' },
    { name: 'date', title: 'Budget Code' }
  ];
  }

  allProjects: ExpenseProjectDto = new ExpenseProjectDto();
  myexpenseType: ExpenseTypeDto = new ExpenseTypeDto();
  myProjects: ExpenseGroup [] = [];
  myTypes: ExpenseType [] = [];

  uploadType: string = 'manual';


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

  changeUploadType(type){

    console.log('Hey guy',type)
    if(type == 'manual'){
      this.uploadType = 'manual';
    }
    else
    this.uploadType = 'bulk';
  }

  // addProject(){
  //   console.log('Hello Sir');
  // }

  // addExpenseType(){
  //   console.log('Hello Ma');
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
    this.types.addUpdateExpenseType(this.myexpenseType).subscribe(data => {
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

  selectTab(event: NbTabComponent){
    super.selectTab(event);
    this.topActionButtons[0].label = this.selectedTab === TABS.PROJECTS ? 'Add Project' : 'Add New Type'
  }
}
