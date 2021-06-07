import { Router } from '@angular/router';
import { DataServiceProxy, CommonServiceProxy, BudgetDTO } from 'app/_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ExpenseProject, AddUpdateBudgetServiceProxy, ManageBudgetDTO, SingleDisbursementPostDTO, SingleDisbursementServiceProxy, IDTextViewModel, BudgetItemDTO, FetchAllBudgetItemsServiceProxy, GetAllPaymentInstitutionsServiceProxy, PayInstitutionDTO, DropdownValue, GetExpenseProjectServiceProxy, IDropdownValue, FrequencyRule, TenantBeneficiary, FetchAllBudgetsServiceProxy } from './../../../../_services/service-proxies';
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

  recipientVal = [
    {value: 'new', title: 'New Account'},
    {value: 'existing', title: 'Existing Beneficiary'},
    {value: 'employee', title: 'Employee'},
  ];

  recipient;

  loading: boolean = false;
  btnProcessing: boolean = false;

  selectedTab = TABS.SINGLE;
  TABS = TABS;

  disburseForm: NgForm;
  category: number = 1;
  myrecipient: string = 'new';
  recurrence: boolean = false;
  allBudgetItems: BudgetItemDTO []= [];
  allChannels = [];
  allbanksName:IDropdownValue[] = [];
  allProjects: ExpenseProject [] = [];
  allFrequencies: FrequencyRule [] = [];
  allBeneficiaries: TenantBeneficiary [] = [];

  allCategories: IDTextViewModel [] = [];

  dataIndex: number = 1;
  myBudget: BudgetDTO[] = [];

  allBudget: ManageBudgetDTO = new ManageBudgetDTO();

  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  disbursement: SingleDisbursementPostDTO = new SingleDisbursementPostDTO().clone();

  constructor(private disbursementService: SingleDisbursementServiceProxy, private alert: AlertserviceService,
    private dataService: DataServiceProxy, private budgetItemService: FetchAllBudgetItemsServiceProxy,
    private router: Router, private project: GetExpenseProjectServiceProxy,
    private budgetService: FetchAllBudgetsServiceProxy,
    private commonService: CommonServiceProxy  ) { }

  ngOnInit(): void {

    this.getChannels();
    this.getFrequencies();
    this.getBanks();
    this.getCategories();
    this.getProjects();
    this.getBeneficiaries();
    this.fetAllBudget();
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  changeDisburse(event){
      this.category = event;
      if(this.category === 1){
        this.disbursement.categoryId = 1;
        console.log(this.disbursement.categoryId);
      } else {
        this.disbursement.categoryId = 2;
        console.log(this.disbursement.categoryId);
      }
  }

changeRecipient(event){
  this.myrecipient = event;
  }

toggle(event){
  this.recurrence = event;
  }

benefiary(event){
  this.saveBeneficiary = event;
  }

async getBudgetItem(event){
  this.loading = true;
  const data = await this.budgetItemService.getAllBudgetItems(event).toPromise();
  if(!data.hasError){
  this.allBudgetItems = data.result;
  this.loading = false;
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

cancelSubmission(){
  this.router.navigateByUrl('/disbursement/disbursement/requests');
}


createDisbursement(){
  this.btnProcessing = true;
  console.log('Hey Boss Datata',this.disbursement)
  let scheduledDay = (this.disbursement.scheduledDate).getDay()
  let endDay = (this.disbursement.endDate).getDay();
  if(endDay < scheduledDay){
    this.alert.openModalAlert(this.alert.ALERT_TYPES.CONFIRM, 'The end date is less than the scheduled date', 'Continue').subscribe(res => {
      if(res){
        this.disbursement.runCount = 1;
        this.disbursementService.postSingleDisbursement(this.disbursement).subscribe(data => {
          this.btnProcessing = false;
        if(!data.hasError){
        this.alert.openModalAlert(this.alert.ALERT_TYPES.SUCCESS, 'Disbursement Added Successfully', 'OK').subscribe(dataAction =>{
          if(dataAction){
            this.disbursement = new SingleDisbursementPostDTO().clone();
            this.router.navigateByUrl('/disbursement/disbursement/requests')
          }
        });
      }
    });
      }
    })
  }
}

async getCategories(){
  const data = await this.dataService.getDisbursementCategories().toPromise();
  if(!data.hasError){
    this.allCategories = data.result;
    console.log('available cat', this.allCategories)
  }
}


getDayDifference(){
  let scheduledDay = (this.disbursement.scheduledDate).getDay()
  let endDay = (this.disbursement.endDate).getDay();
  if(endDay < scheduledDay){
    alert('Please check the end date as it is less than disbursemt day')
  }
  console.log(scheduledDay, endDay);
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

getSelectedEmployee(event,selectType) {
  console.log(event)
   if(selectType == 'employee'){
    this.disbursement.id= event[0].employeeNumber;
   }
   console.log(selectType, event)
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

async fetchDisbursementCategories(){
  const data = await this.dataService.getDisbursementCategories().toPromise();
  if(!data.hasError){
    this.allCategories = data.result;
  }
}

async fetAllBudget(){
  const data = await this.budgetService.getAllBudgets().toPromise();
  if(!data.hasError){
   this.myBudget = data.result;
   console.log('All Bugdet Items', this.myBudget)
  }
 }


saveBeneficiary(event){
alert(event);
}

}
