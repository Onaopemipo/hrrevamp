import { AlertserviceService } from './../../../../_services/alertservice.service';
import { Department, CommonServiceProxy } from 'app/_services/service-proxies';
import { BudgetDTO, DisbursementBudgetItem, AddUpdateBudgetServiceProxy, ManageBudgetDTO, BudgetItemDTO, AddUpdateBudgetItemServiceProxy, ManageBudgetItemDTO, DisbursementBudgetItemAllocation } from './../../../../_services/service-proxies';
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
  budgetItem: ManageBudgetItemDTO = new ManageBudgetItemDTO;
  disBudgetItem: DisbursementBudgetItem []= [];
  allDepartments: Department [] = [];
  departments: DisbursementBudgetItemAllocation = new DisbursementBudgetItemAllocation().clone();

  constructor(private budgetService: AddUpdateBudgetServiceProxy, private alertMe: AlertserviceService,
    private alert: AlertserviceService, private common: CommonServiceProxy, private updateItem: AddUpdateBudgetItemServiceProxy) { }

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
    // this.alert.openCatchErrorModal('Failed', 'Budget could not be added', 'Dismiss','errors');
    console.error();

  }
  }

  addDepartment(){
    let myDepartment = new DisbursementBudgetItemAllocation();
    // myDepartment.code = this.departments.code;
    // myDepartment.name = this.departments.name;
    // myDepartment.
    // this.alertMe.alertMessage
    console.log('yshdhdh', this.departments);
  }

  async fetchDepartments(){
    const data = await this.common.getDepartments().toPromise();
    if(!data.hasError){
      this.allDepartments = data.result;
      console.log('My departments', this.allDepartments)
    }
  }

  async updateBudgetItem(){
    const data = await this.updateItem.addUpdateBudgetItem(this.budgetItem).toPromise()
  }


}
