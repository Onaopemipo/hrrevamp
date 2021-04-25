import { AlertserviceService } from './../../../_services/alertservice.service';
import { NgForm } from '@angular/forms';
import { PromotionEligibilityViewModel, AddUpdateEligibleBucketServiceProxy, Sp_FetchEligibleEmployees, GetPromotionEligibilityListsServiceProxy, FetchApprovalProcessServiceProxy, ApprovalProcess } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { IStatus, MyColor } from 'app/components/status/models';
import { Router } from '@angular/router';

export class eligibilityWithStatus extends PromotionEligibilityViewModel implements IStatus {
  elibility: PromotionEligibilityViewModel;
  
  constructor(elibility: PromotionEligibilityViewModel) {
    super(elibility);
    this.elibility = elibility;

  }
  get status() {
    return this.elibility.isClosed;
}
  getStatusLabel() {
    if (this.elibility.isClosed) return 'Closed';
    if (!this.elibility.isClosed) return 'Open';
   
  }
  getStatusColor() {
    if (this.elibility.isClosed) return new MyColor(253, 238, 238);
    if (!this.elibility.isClosed) return new MyColor(0, 153, 74);
   
    return new MyColor(242, 0, 74);
 }
 }
enum TOP_ACTIONS {
  ADD_NEW,
  INITIATE_VOLUNTARY_EXIT
}


@Component({
  selector: 'ngx-promotioneligibility',
  templateUrl: './promotioneligibility.component.html',
  styleUrls: ['./promotioneligibility.component.scss']
})
export class PromotioneligibilityComponent implements OnInit {
  showAddPlanModal = false;
  topActionButtons = [
    { name: TOP_ACTIONS.ADD_NEW, label: 'Create New', 'icon': 'plus', outline: false },

  ];

  tableColumns = [   
    { name: 'name', title: 'NAME',type: ColumnTypes.Text },   
    { name: 'generated_by', title: 'GENERATED BY',type: ColumnTypes.Text },
    { name: 'noOfMembers', title: 'Members Count', type: ColumnTypes.Text },
    { name: 'date_generated', title: 'DATE CREATED',type: ColumnTypes.Date },
    { name: 'is_closed', title: 'STATUS',type: ColumnTypes.Text },

  ];

  promotionBucket: NgForm;
  promotionBucketList: PromotionEligibilityViewModel = new PromotionEligibilityViewModel().clone();
  eligibilityList: Sp_FetchEligibleEmployees[] = [];
  approvalProcesses: ApprovalProcess[] = [];
  filter = {
    end: null,
    start: null,
    is_closed: 0,
    _PageSize: 10,
    _PageNumber: 1
  }
  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'View' },
    { name: ACTIONS.DELETE, label: 'Update List' },
  ];
  totalItems = 0;
  currentPage = 1;
  loading: boolean = false;
  modificationStatus: boolean = false;
  constructor(private promotion: AddUpdateEligibleBucketServiceProxy,private FetchApprovalProcessService:FetchApprovalProcessServiceProxy,
    private alert: AlertserviceService, private GetEligibilityListService: GetPromotionEligibilityListsServiceProxy,
  private router: Router) { }
  
    tableActionClicked(event: TableActionEvent) {
      if (event.name == "1") {
        this.promotionBucketList = event.data;
        this.showAddPlanModal = true;
        this.modificationStatus = true;
      }
      if (event.name == "2") {
     this.router.navigate(['/employeemodule/promotion'],{queryParams:{data:JSON.stringify(event.data)}})
      }
       }
    filterUpdated(filter: any) {
      this.filter = {...this.filter, ...filter};
      this.fetchEligibility();
    }
    get showEmpty() {
      return this.eligibilityList.length === 0;
    }
  ngOnInit(): void {
    this.fetchEligibility();
    this.getApprovalProcesses();
    this.promotionBucketList.is_closed = false;
    this.promotionBucketList.noOfMembers = 0;
  }

  async addToEligibilityList() {
    this.loading = true;
    console.log(this.promotionBucketList)
    this.promotion.addUpdateEligibleBucket(this.promotionBucketList).subscribe(data => {
    if(!data.hasError){
      this.fetchEligibility();
      this.showAddPlanModal = false;
      this.alert.openModalAlert(this.alert.ALERT_TYPES.SUCCESS, data.message, 'OK');
      this.promotionBucketList = new PromotionEligibilityViewModel().clone();
      this.modificationStatus = false;
    } else {
      this.alert.openModalAlert(this.alert.ALERT_TYPES.FAILED, data.message, 'OK');
    }
    this.loading = false;
    }, (error) => {
      this.loading = false;
      if (error.status == 400) {
        this.alert.openCatchErrorModal(this.alert.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    });

  }

  async fetchEligibility(){
    const data = await this.GetEligibilityListService.getPromotionEligibilityLists(this.filter._PageSize, this.filter._PageNumber,this.filter.is_closed,this.filter.start,this.filter.end).toPromise();
    if(!data.hasError){
     // this.eligibilityList = data.result;

      console.log(this.eligibilityList)
    }
    else {
      console.log('Error has occured')
    }

  }
 async getApprovalProcesses() {
   const data = await this.FetchApprovalProcessService.fetchApprovalProcess(undefined).toPromise();
   if(!data.hasError){
    this.approvalProcesses = data.result;
    console.log(this.eligibilityList)
  }
  else {
    console.log('Error has occured')
  }
}
  modal(buttion) {
    if (buttion === TOP_ACTIONS.ADD_NEW) {
      this.showAddPlanModal = true;
    }
  //  if (buttion === TOP_ACTIONS.ADD_PLAN) {
     // this.showLeavePlanModal = true;
   // }
  }

  filterBucket(is_approved = []) {
   
    let tabtittle = "";
    is_approved.forEach(value => {
      if (value.activeValue) tabtittle = value.tabTitle;
    });
    console.log(tabtittle);
     this.filter.is_closed = tabtittle == 'Open'? 0 : 1;
    this.fetchEligibility();
  }
}
