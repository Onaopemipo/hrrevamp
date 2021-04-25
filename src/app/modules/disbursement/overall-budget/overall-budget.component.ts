import { BudgetDTO, FetchAllBudgetsServiceProxy, FetchAllBudgetItemsServiceProxy, BudgetItemDTO, CommonServiceProxy, Department, DisbursementBudgetItemAllocation, AddUpdateBudgetItemServiceProxy, ManageBudgetItemDTO, FetchBudgetServiceProxy, AddUpdateBudgetServiceProxy, ManageBudgetDTO, DisbursementBudgetItemAllocationDTO, DeleteBudgetServiceProxy, DeleteBudgetItemServiceProxy } from './../../../_services/service-proxies';
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
  editBudget: boolean = false;
  addBudget: boolean = false;
  addItemModal: boolean = false;
  editItem: boolean = false;
  defaultPage: number = 0;
  budget: BudgetDTO = new BudgetDTO;
  newBudget: ManageBudgetDTO = new ManageBudgetDTO;
  budgetItem: BudgetItemDTO = new BudgetItemDTO().clone();
  departments: DisbursementBudgetItemAllocation = new DisbursementBudgetItemAllocation().clone();
  budgetItemsCounter; number = 0;

  noBudgetItem: string = 'No Budget Item Found';
  noBudget: string = 'There is no budget item yet, click the button below to add budget item';
  button: string = 'Add Budget Item';

  constructor(private router: Router, private budgetItemService: FetchAllBudgetItemsServiceProxy,
    private budgetService: FetchAllBudgetsServiceProxy, private singleBudget: FetchBudgetServiceProxy,
    private alertMe: AlertserviceService, private common: CommonServiceProxy, private deleteBudget: DeleteBudgetServiceProxy,
     private budgetItemUpdate: AddUpdateBudgetItemServiceProxy, private addBudgetService: AddUpdateBudgetServiceProxy,
     private deleteItem: DeleteBudgetItemServiceProxy) { }

  ngOnInit(): void {
    this.fetAllBudget();
    this.onChangeYear(this.dataIndex);
    this.fetAllBudgetItems(this.budgetId);
    this.fetchDepartments();
  }

  topActionButtons: IRequiredButton[] = [
    { name: 'h', outline: false, icon: 'plus', label: 'Add budget item'}
  ];

  get totalBudget() {
    return 300000;
  }

  allDepartments: Department [] = [];
  addedDepartments: DisbursementBudgetItemAllocation [] = [];
  overallBudget: MyBudget = new MyBudget;
  myBudget: BudgetDTO[] = [];
  currentFinancialYear;
  dataIndex: number = 0;
  budgetId:number = 0;
  finYear: BudgetDTO = new BudgetDTO;
  singleBudgetUpdate: ManageBudgetDTO = new ManageBudgetDTO().clone();
  finLoading: boolean = false;
  editBudgetItem: MyBudgetItem = new MyBudgetItem;
  allBudgetItems: BudgetItemDTO []= [];
  allItems: MyBudgetItem []= [];
  editBudgetItemModal: boolean = false;

  // addBudgetItem(){

  //   this.router.navigateByUrl('/disbursement/budget/setup');
  // }

  modalShow(){
    this.addItemModal = true;
  }

  viewBudgetItemModal(){
    this.editBudgetItemModal = !this.editBudgetItemModal;
  }

 async fetAllBudgetItems(num:number){
    this.dataIndex = num;
    // alert(this.dataIndex)
    const data = await this.budgetItemService.getAllBudgetItems(this.dataIndex).toPromise();
    this.allBudgetItems = data.result;
    this.budgetItemsCounter = data.totalRecord;
    console.log('Yo boss', this.allBudgetItems)
  }

  editbudgetItemModal(){
    this.editItem = !this.editItem;
  }

  async editBudgetModal(event:number){
    this.budgetId = event;
    const data = await this.singleBudget.getBudget(this.budgetId).toPromise();
    if(!data.hasError){
      this.singleBudgetUpdate = data.result;
    }
    this.editBudget = !this.editBudget;
  }

  addBudgetModal(){
    this.addBudget = !this.addBudget;
  }

  addDepartmentAllocations() {
    let myAllocations = new DisbursementBudgetItemAllocation;
    myAllocations.departmentId = this.departments.departmentId;
    myAllocations.allocatedAmount = this.departments.allocatedAmount;
    this.addedDepartments.push(myAllocations)
    console.log('Hey guys',this.addedDepartments)
    this.departments = new DisbursementBudgetItemAllocation().clone();
  }

  removeDepartment(id){
    alert(id);
  }

 async fetchSingleBudget(){
  const data = await this.singleBudget.getBudget(this.budgetId).toPromise();
  if(!data.hasError){
    this.singleBudgetUpdate = data.result;
    console.log('I have been fetched', this.singleBudgetUpdate);

  }
  }

  deleteMyBudget(id:number){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you wish to delete?', 'Yes').subscribe(dataAction => {
     if(dataAction == 'closed'){
      this.deleteBudget.deleteBudget(id).subscribe(data => {
        if(!data.hasError && data.result.isSuccessful == true){
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Budget has been deleted', 'Dismiss')
        }
      });
     }
    });
  }

  deleteMyBudgetItem(id:number){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you wish to delete budget item?', 'Yes').subscribe(dataAction => {
     if(dataAction == 'closed'){
      this.deleteItem.deleteBudgetItem(id).subscribe(data => {
        if(!data.hasError && data.result.isSuccessful == true){
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Budget item has been deleted', 'Dismiss')
        }
      });
     }
    });
  }

 async updateSingleBudget(){
    const data = await this.addBudgetService.addUpdateBudget(this.singleBudgetUpdate).toPromise();
    if(!data.hasError){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Budget updated Successfully', 'Dismiss').subscribe(data => {
      if(data == 'closed'){
        this.addItemModal = false;
      }
    });
    } else {
      console.error();

    }
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
    this.defaultPage = data.totalRecord;
    console.log('All Bugdet Items', this.myBudget)
   }
  }

  async onChangeYear(budgetId:number){
    // this.loader = !this.loader;
    this.finLoading = true;
    this.dataIndex = budgetId;
    // alert(this.dataIndex)
    // alert(budgetId)
    const data = await this.singleBudget.getBudget(budgetId).toPromise();
    if(!data.hasError){
      this.finYear = data.result;
      console.log('My Values:', this.finYear)
      this.finLoading = false;
    }
    else {
      this.finLoading = false;
    }
  }

  async addNewBudget(){
    const data = await this.addBudgetService.addUpdateBudget(this.newBudget).toPromise();
    if(!data.hasError){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Budget Created Successfully', 'Dismiss').subscribe(data=>{
      this.addBudget = false;
    })
    } else {
      // this.alert.openCatchErrorModal('Failed', 'Budget could not be added', 'Dismiss','errors');
      console.error();

    }
    }

    budgetSetup(){
      this.router.navigateByUrl('/budget/setup');
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
        this.router.navigateByUrl('/disbursement');
        this.addItemModal = false;
      });
    }
    else {
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Error Adding Item', 'Dismiss')
    }
  }
}
