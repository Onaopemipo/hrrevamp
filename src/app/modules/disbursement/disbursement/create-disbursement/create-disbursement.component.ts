import { DataServiceProxy } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateBudgetServiceProxy, ManageBudgetDTO, SingleDisbursementPostDTO, SingleDisbursementServiceProxy, IDTextViewModel, BudgetItemDTO, FetchAllBudgetItemsServiceProxy, GetAllPaymentInstitutionsServiceProxy, PayInstitutionDTO, DropdownValue, GetExpenseProjectServiceProxy } from './../../../../_services/service-proxies';
import { MyDisbursement, DisbursementService } from './../../services/disbursement.service';
import { Component, OnInit } from '@angular/core';

enum TABS {
  SINGLE, BULK
}

@Component({
  selector: 'ngx-create-disbursement',
  templateUrl: './create-disbursement.component.html',
  styleUrls: ['./create-disbursement.component.scss']
})
export class CreateDisbursementComponent implements OnInit {

  selectedTab = TABS.SINGLE;
  TABS = TABS;

  budgetItem: boolean = false;
  recipient: number = 1;
  recurrence: boolean = false;
  allBudgetItems: BudgetItemDTO []= [];
  allChannels: PayInstitutionDTO [] = [];
  allbanks: DropdownValue [] = [];
  allProjects: any = [];

  AllCategories: IDTextViewModel [] = [];

  disbursement: SingleDisbursementPostDTO = new SingleDisbursementPostDTO;

  constructor(private disbursementService: SingleDisbursementServiceProxy, private alert: AlertserviceService,
    private dataService: DataServiceProxy, private budgetItemService: FetchAllBudgetItemsServiceProxy,
    private channel: GetAllPaymentInstitutionsServiceProxy, private project: GetExpenseProjectServiceProxy ) { }

  ngOnInit(): void {
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  changeDisburse(event){
      this.budgetItem = !this.budgetItem;
}

changeRecipient(event){
  this.recipient = event;
}

toggle(event){
  this.recurrence = event;
}

async fetAllBudgetItems(){
  const data = await this.budgetItemService.getAllBudgetItems().toPromise();
  this.allBudgetItems = data.result
  console.log('Yo boss', this.allBudgetItems)
}


async createDisbursement(){
  const data = await this.disbursementService.postSingleDisbursement(this.disbursement).toPromise();
  if(!data.hasError){
    this.alert.openModalAlert('Budget Created', 'Budget Added Successfully', 'Dismiss');
  } else {
    console.log(data.message)
  }
}

async getCategories(){
  const data = await this.dataService.getDisbursementCategories().toPromise();
  if(!data.hasError){
    this.AllCategories = data.result;
  }
}

async getBanks(){
  const data = await this.dataService.getDropDownValues('bank').toPromise();
  if(!data.hasError){
    this.allbanks = data.result;
  }
}

async getChannels(){
  const data = await this.channel.getAllPaymentInstitutions(1,1,0).toPromise();
  if(!data.hasError){
    this.allChannels = data.result;
  }
}

async getProjects(){
  const data = await this.project.getExpenseProject(0,'','',null,'','',0,0).toPromise();
  this.allProjects = data.find;
}

}
