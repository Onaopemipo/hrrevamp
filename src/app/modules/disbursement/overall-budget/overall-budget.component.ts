import { BudgetDTO, FetchAllBudgetsServiceProxy, FetchGetBudgetServiceProxy, FetchAllBudgetItemsServiceProxy, BudgetItemDTO } from './../../../_services/service-proxies';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { MyDepartment } from './../../module-settings/services/api.service';
import { MyBudgetItem, MyBudgetItemDepartment, BudgetItemService } from './../services/budget-item.service';
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

  editBudgetModal: boolean = false;
  addItemModal: boolean = false;
  editItem: boolean = false;
  budget: BudgetDTO = new BudgetDTO;
  budgetItem: MyBudgetItem = new MyBudgetItem;
  departments: MyBudgetItemDepartment = new MyBudgetItemDepartment;

  constructor(private router: Router, private budgetItemService: FetchAllBudgetItemsServiceProxy,
    private budgetService: FetchAllBudgetsServiceProxy, private budgetServices: FetchGetBudgetServiceProxy, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
    this.fetAllBudget();
    this.onChangeYear(this.dataIndex);
    this.fetAllBudgetItems();
  }

  topActionButtons: IRequiredButton[] = [
    { name: 'h', outline: false, icon: 'plus', label: 'Add budget item'}
  ];

  get totalBudget() {
    return 300000;
  }

  overallBudget: MyBudget = new MyBudget;
  myBudget: BudgetDTO [] = [];
  currentFinancialYear;
  dataIndex: number = 20781;
  finYear: BudgetDTO = new BudgetDTO;
  loader:boolean = false;
  finLoading: boolean = false;
  item: MyBudgetItem = new MyBudgetItem;
  allBudgetItems: BudgetItemDTO []= [];
  allItems: MyBudgetItem []= [];

  addBudgetItem(){
    this.router.navigateByUrl('/disbursement/budget/setup');
  }

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

  addDepartment(){
    let myDepartment: MyBudgetItemDepartment[] = [];
    myDepartment.push(this.departments)
    this.alertMe.alertMessage
    console.log(myDepartment);
  }

  updateBudgetItem(id){
    this.editBudgetModal = !this.editBudgetModal;
    let index = this.myBudget.indexOf(id)
    console.log('this is the ID',index)
    console.log('Here is your Budget', this.myBudget)
  }

  async fetAllBudget(){
   const data = await this.budgetService.getAllBudgets().toPromise();
   this.myBudget = data.result;
   console.log('All Bugdet Items', this.myBudget)
  }

  async onChangeYear(budgetId:number){
    this.loader = !this.loader
    this.finLoading = true;
    this.dataIndex = budgetId;
    const data = await this.budgetServices.getGetBudget(budgetId).toPromise();
    this.finYear = data.result;
    this.finLoading = false;
  }

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

  addBudget(){

  }

}
