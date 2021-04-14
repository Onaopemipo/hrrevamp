import { BudgetDTO, FetchAllBudgetsServiceProxy, FetchGetBudgetServiceProxy, FetchAllBudgetItemsServiceProxy, BudgetItemDTO, CommonServiceProxy, Department, DisbursementBudgetItemAllocation, AddUpdateBudgetItemServiceProxy, ManageBudgetItemDTO } from './../../../_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { MyDepartment } from './../../module-settings/services/api.service';
import { MyBudgetItem, BudgetItemService } from './../services/budget-item.service';
import { MyBudget, BudgetService } from './../services/budget.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IRequiredButton } from 'app/components/componentsheader/componentsheader.component';

@Component({
  selector: 'ngx-overall-budget',
  templateUrl: './overall-budget.component.html',
  styleUrls: ['./overall-budget.component.scss']
})
export class OverallBudgetComponent implements OnInit {

  myHeader: string = 'You have not created any budget';
  myDescription: string = 'Start your setup by clicking the button below';
  myButton: string = 'Create Budget'
  editBudgetModal: boolean = false;
  addItemModal: boolean = false;
  editItem: boolean = false;
  defaultPage: number = 3;
  budget: BudgetDTO = new BudgetDTO;
  budgetItem: BudgetItemDTO = new BudgetItemDTO().clone();
  departments: DisbursementBudgetItemAllocation = new DisbursementBudgetItemAllocation().clone();

  noBudgetItem: string = 'No Budget Item Found';
  noBudget: string = 'There is no budget item yet, click the button below to add budget item';
  button: string = 'Add Budget Item';

  constructor(private router: Router, private budgetItemService: FetchAllBudgetItemsServiceProxy,
    private budgetService: FetchAllBudgetsServiceProxy, private budgetServices: FetchGetBudgetServiceProxy,
    private alertMe: AlertserviceService, private common: CommonServiceProxy, private budgetItemUpdate: AddUpdateBudgetItemServiceProxy) { }

  ngOnInit(): void {
    this.fetAllBudget();
    this.onChangeYear(this.dataIndex);
    this.fetAllBudgetItems();
    this.fetchDepartments();
  }

  topActionButtons: IRequiredButton[] = [
    { name: 'h', outline: false, icon: 'plus', label: 'Add budget item'}
  ];

  get totalBudget() {
    return 300000;
  }

  allDepartments: Department [] = [];
  overallBudget: MyBudget = new MyBudget;
  myBudget: BudgetDTO[] = [];
  currentFinancialYear;
  dataIndex: number = 20781;
  finYear: BudgetDTO = new BudgetDTO;
  // loader:boolean = false;
  finLoading: boolean = false;
  editBudgetItem: MyBudgetItem = new MyBudgetItem;
  allBudgetItems: BudgetItemDTO []= [];
  allItems: MyBudgetItem []= [];

  // addBudgetItem(){

  //   this.router.navigateByUrl('/disbursement/budget/setup');
  // }

  modalShow(){
    this.addItemModal = !this.addItemModal;
  }

 async fetAllBudgetItems(){
    const data = await this.budgetItemService.getAllBudgetItems().toPromise();
    this.allBudgetItems = data.result
    console.log('Yo boss', this.allBudgetItems)
  }

  editModal(){
    this.editItem = !this.editItem;
  }

  // addDepartment(){
  //   let myDepartment = [];
  //   myDepartment.push(this.departments)
  //   this.alertMe.alertMessage
  //   console.log(myDepartment);
  // }

  updateBudgetItem(id){
    this.editBudgetModal = !this.editBudgetModal;
    // let index = this.myBudget.indexOf(id)
    // console.log('this is the ID',index)
    console.log('Here is your Budget', this.myBudget)
  }

  async fetchDepartments(){
    const data = await this.common.getDepartments().toPromise();
    if(!data.hasError){
      this.allDepartments = data.result;
      console.log('My departments', this.allDepartments)
    }
  }

  async fetAllBudget(){
   const data = await this.budgetService.getAllBudgets().toPromise();
   if(!data.hasError){
    this.myBudget = data.result;
    this.defaultPage = data.totalRecord
    console.log('All Bugdet Items', this.myBudget)
   }
  }

  async onChangeYear(budgetId:number){
    // this.loader = !this.loader;
    this.finLoading = true;
    this.dataIndex = budgetId;
    // alert(budgetId)
    const data = await this.budgetServices.getGetBudget(budgetId).toPromise();
    if(!data.hasError){
      this.finYear = data.result;
      this.finLoading = false;
    }
    else {
      this.finLoading = false;
    }
  }


  async addBudgetItem(){
    let budgetItemUpdate = new ManageBudgetItemDTO
    budgetItemUpdate.name = this.budgetItem.name;
    budgetItemUpdate.spent = 0;
    budgetItemUpdate.code = this.budgetItem.code;
    budgetItemUpdate.budgetAllocations = JSON.stringify(this.departments);
    budgetItemUpdate.totalBudget = this.budgetItem.totalBudget
    const data = await this.budgetItemUpdate.addUpdateBudgetItem(budgetItemUpdate).toPromise();
    if(!data.hasError){
      this.alertMe.openModalAlert('Success', 'Item Added!', 'Dismiss');
    }
    else {
      this.alertMe.openModalAlert('Error', 'Error Adding Item', 'Dismiss')
    }
  }
s
  async loadBudgetItems(event:number){
    // this.loader = !this.loader
    // this.finLoading = true;
    // this.dataIndex = event;
    // const data = await this.budgetItemService.fetch(event)
    // this.allItems = data.;
    // this.finLoading = false;
  }

  // async fetchBudget(){
  //   const data = await this.budgetService.fetch(this.dataIndex).toPromise();
  //   this.finYear = data;
  // }

  // budgetModal(){
  //   this.editBudgetModal = !this.editBudgetModal;
  // }
}
