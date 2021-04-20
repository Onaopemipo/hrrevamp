import { DataServiceProxy, CommonServiceProxy } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ExpenseProject, AddUpdateBudgetServiceProxy, ManageBudgetDTO, SingleDisbursementPostDTO, SingleDisbursementServiceProxy, IDTextViewModel, BudgetItemDTO, FetchAllBudgetItemsServiceProxy, GetAllPaymentInstitutionsServiceProxy, PayInstitutionDTO, DropdownValue, GetExpenseProjectServiceProxy, IDropdownValue, FrequencyRule, TenantBeneficiary } from './../../../../_services/service-proxies';
import { MyDisbursement, DisbursementService } from './../../services/disbursement.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

enum TABS {
  SINGLE, BULK
}

@Component({
  selector: 'ngx-create-disbursement',
  templateUrl: './create-disbursement.component.html',
  styleUrls: ['./create-disbursement.component.scss']
})
export class CreateDisbursementComponent implements OnInit {

  disburseFor = [
    { value: 'budget', label: 'Budget Item', checked: true },
    { value: 'project', label: 'Project' },
  ]

  selectedTab = TABS.SINGLE;
  TABS = TABS;

  disburseForm: NgForm;
  budgetItem: boolean = true;
  myrecipient: string = '1';
  recurrence: boolean = false;
  allBudgetItems: BudgetItemDTO []= [];
  allChannels = [];
  allbanksName:IDropdownValue[] = [];
  allProjects: ExpenseProject [] = [];
  allFrequencies: FrequencyRule [] = [];
  allBeneficiaries: TenantBeneficiary [] = [];

  AllCategories: IDTextViewModel [] = [];

  dataIndex: number = 1;

  disbursement: SingleDisbursementPostDTO = new SingleDisbursementPostDTO;

  constructor(private disbursementService: SingleDisbursementServiceProxy, private alert: AlertserviceService,
    private dataService: DataServiceProxy, private budgetItemService: FetchAllBudgetItemsServiceProxy,
    private channel: GetAllPaymentInstitutionsServiceProxy, private project: GetExpenseProjectServiceProxy,
    private commonService: CommonServiceProxy  ) { }

  ngOnInit(): void {

    this.getChannels();
    this.getFrequencies();
    this.getBanks();
    this.getCategories();
    this.getProjects();
    this.fetAllBudgetItems();
    this. getBeneficiaries();
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  changeDisburse(event){
      this.budgetItem = event;
}

changeRecipient(event){
  this.myrecipient = event;
  // alert(event)
}

toggle(event){
  this.recurrence = event;
}

benefiary(event){
  this.saveBeneficiary = event;
}

async fetAllBudgetItems(){
  const data = await this.budgetItemService.getAllBudgetItems(this.dataIndex).toPromise();
  if(!data.hasError){
    this.allBudgetItems = data.result;
    console.log('Yo boss,, I am here', this.allBudgetItems)
  }

}

async getFrequencies(){
  const data = await this.commonService.getFrequencies().toPromise();
  if(!data.hasError){
    this.allFrequencies = data.result;
    console.log('I am here:', this.allFrequencies)
  }
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
    this.allbanksName = data.result;
    console.log('banks', this.allbanksName);
  }
}

async getChannels(){
  const data = await this.commonService.getPaymentChannels().toPromise();
  if(!data.hasError){
    this.allChannels = data.result;
    console.log('this',this.allChannels)
  }
}

get disableSubmitbtn(){
  let resp = true;
  if(this.disbursement.amount == 0 && !this.disbursement.endDate && !this.disbursement.startDate) resp= false;
  return resp;
}

async getProjects(){
  const data = await this.project.getExpenseProject(0,'','',false,'','',1,10).toPromise();
  this.allProjects = data.result;
  console.log('this is project:',this.allProjects)
}

async getBeneficiaries(){
  const data = await this.commonService.getBeneficiaries('').toPromise();
  if(!data.hasError){
    this.allBeneficiaries = data.result;
    console.log('beneficiaries: ', this.allBeneficiaries)
  }
}


saveBeneficiary(event){
alert(event);
}

}
