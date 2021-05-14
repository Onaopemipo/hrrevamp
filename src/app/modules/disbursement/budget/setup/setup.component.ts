import { Router } from '@angular/router';
import { AlertserviceService } from './../../../../_services/alertservice.service';
import { Department, CommonServiceProxy } from 'app/_services/service-proxies';
import { BudgetDTO, DisbursementBudgetItem, AddUpdateBudgetServiceProxy, ManageBudgetDTO, BudgetItemDTO, AddUpdateBudgetItemServiceProxy, ManageBudgetItemDTO, DisbursementBudgetItemAllocation, FetchAllBudgetsServiceProxy } from './../../../../_services/service-proxies';
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
  // disBudgetItem: DisbursementBudgetItem []= [];
  allDepartments: Department [] = [];
  myBudget: BudgetDTO[] = [];
  addItemModal: boolean = false;
  addedDepartments: DisbursementBudgetItemAllocation [] = [];
  departments: DisbursementBudgetItemAllocation = new DisbursementBudgetItemAllocation().clone();
  // addedDepartments: DisbursementBudgetItemAllocation [] = [];

  constructor(private budgetService: AddUpdateBudgetServiceProxy, private allBudgets: FetchAllBudgetsServiceProxy,  private alertMe: AlertserviceService,
    private alert: AlertserviceService, private common: CommonServiceProxy, private router: Router,
    private budgetItemUpdate: AddUpdateBudgetItemServiceProxy) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetAllBudget();
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
  if(!data.hasError && data.result.isSuccessful == true){
  this.alert.openModalAlert(this.alert.ALERT_TYPES.SUCCESS, 'Budget Added Successfully', 'Dismiss');
  this.page = 2;
  this.fetAllBudget();
  } else {
    // this.alert.openCatchErrorModal('Failed', 'Budget could not be added', 'Dismiss','errors');
    console.error();

  }
  }

  addDepartment(){
    let myAllocations = new DisbursementBudgetItemAllocation;
    myAllocations.departmentId = this.departments.departmentId;
    myAllocations.allocatedAmount = this.departments.allocatedAmount;
    this.addedDepartments.push(myAllocations)
    console.log('Hey guys',this.addedDepartments)
    this.departments = new DisbursementBudgetItemAllocation().clone();
  }

  async fetAllBudget(){
    const data = await this.allBudgets.getAllBudgets().toPromise();
    if(!data.hasError){
     this.myBudget = data.result;
     console.log('All Bugdet Items', this.myBudget)
    }
   }

  async fetchDepartments(){
    const data = await this.common.getDepartments().toPromise();
    if(!data.hasError){
      this.allDepartments = data.result;
      console.log('My departments', this.allDepartments)
    }
  }

  async updateBudgetItem(){
    let budgetItemUpdate = new ManageBudgetItemDTO
    budgetItemUpdate.budgetID = this.budgetItem.budgetID;
    budgetItemUpdate.name = this.budgetItem.name;
    budgetItemUpdate.spent = 0;
    budgetItemUpdate.code = this.budgetItem.code;
    budgetItemUpdate.budgetAllocations = JSON.stringify(this.addDepartment);
    budgetItemUpdate.totalBudget = this.budgetItem.totalBudget
    const data = await this.budgetItemUpdate.addUpdateBudgetItem(budgetItemUpdate).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Item Added!', 'Dismiss').subscribe(data => {
        this.addItemModal = false;
      });
    }
    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Error Adding Item', 'Dismiss')
    }
  }

  // addDepartmentAllocations() {
  //   let myAllocations = new DisbursementBudgetItemAllocation;
  //   myAllocations.departmentId = this.departments.departmentId;
  //   myAllocations.allocatedAmount = this.departments.allocatedAmount;
  //   this.addedDepartments.push(myAllocations)
  //   console.log('Hey guys',this.addedDepartments)
  //   this.departments = new DisbursementBudgetItemAllocation().clone();
  // }

  addDepartmentAllocations() {
    let myAllocations = new DisbursementBudgetItemAllocation;
    myAllocations.departmentId = this.departments.departmentId;
    myAllocations.allocatedAmount = this.departments.allocatedAmount;
    this.addedDepartments.push(myAllocations)
    console.log('Hey guys',this.addedDepartments)
    this.departments = new DisbursementBudgetItemAllocation().clone();
  }


  async addBudgetItem(){
    let budgetItemUpdate = new ManageBudgetItemDTO
    budgetItemUpdate.budgetID = this.budgetItem.budgetID;
    budgetItemUpdate.name = this.budgetItem.name;
    budgetItemUpdate.spent = 0;
    budgetItemUpdate.code = this.budgetItem.code;
    budgetItemUpdate.budgetAllocations = JSON.stringify(this.addDepartmentAllocations);
    budgetItemUpdate.totalBudget = this.budgetItem.totalBudget
    const data = await this.budgetItemUpdate.addUpdateBudgetItem(budgetItemUpdate).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Item Added!', 'Dismiss').subscribe(data => {
        this.addItemModal = false;
        this.router.navigateByUrl('/disbursement')
      });
    }
    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Error Adding Item', 'Dismiss')
    }
  }


}
