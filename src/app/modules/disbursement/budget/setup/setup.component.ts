import { AlertserviceService } from './../../../../_services/alertservice.service';
import { Department, CommonServiceProxy } from 'app/_services/service-proxies';
import { BudgetDTO, AddUpdateBudgetServiceProxy, ManageBudgetDTO, BudgetItemDTO } from './../../../../_services/service-proxies';
import { MyBudgetItem, MyBudgetItemDepartment } from './../../services/budget-item.service';
import { MyBudget, BudgetService } from './../../services/budget.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  budget: ManageBudgetDTO = new ManageBudgetDTO;
  budgetItem: BudgetItemDTO = new BudgetItemDTO;
  allDepartments: Department [] = [];
  departments: MyBudgetItemDepartment = new MyBudgetItemDepartment;

  constructor(private budgetService: AddUpdateBudgetServiceProxy, private alertMe: AlertserviceService,
    private alert: AlertserviceService, private common: CommonServiceProxy) { }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  page = 1;

  budgetForm: NgForm;

  gotoBudgetItems() {
    alert(this.page = 2);
  }
  get disableSubmitbtn(){
  let resp = true;
  if(this.budget.totalBudgetAmount == 0 && !this.budget.financialYearStartDate && !this.budget.financialYearEndDate) resp= false;
  return resp;
}
  async addBudget(){
  const data = await this.budgetService.addUpdateBudget(this.budget).toPromise();
  if(!data.hasError){
  this.alert.openModalAlert('Budget Created', 'Budget Added Successfully', 'Dismiss');
  this.page = 2;
  } else {
    this.alert.openModalAlert('Failed', 'Budget could not be added', 'Dismiss');
  }
  }

  addDepartment(){
    let myDepartment: MyBudgetItemDepartment[] = [];
    myDepartment.push(this.departments)
    this.alertMe.alertMessage
    console.log(myDepartment);
  }

  async fetchDepartments(){
    const data = await this.common.getDepartments().toPromise();
    if(!data.hasError){
      this.allDepartments = data.result;
      console.log('My departments', this.allDepartments)
    }
  }




}
