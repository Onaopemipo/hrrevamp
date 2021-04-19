import { AlertserviceService } from './../../../_services/alertservice.service';
import { AddUpdateEligibleBucketServiceProxy, CommonServiceProxy, EmployeeDTO, GetEligibilityListServiceProxy, GetPromotionEligibilityListsServiceProxy, Position, PromotionEligibilityViewModel, Sp_FetchEligibleEmployees } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ACTIONS, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  allowmultipleselection: boolean = true;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  pageName = "Promotion List";
  showTableAction: boolean = false;
  tableColumns = [
    { name: 'first_name', title: 'EMPLOYEE' },
    { name: 'job_role', title: 'PREVIOUS ROLE' },
    { name: 'period_in_current_postion', title: 'PERIOD SPENT' },
    { name: 'next_position', title: 'NEXT POSITION' },
    { name: 'last_promotion_date', title: 'LAST PROMOTION' },
    { name: 'is_submitted', title: 'SUBMITTED' },
    { name: 'log_status', title: 'STATUS' },
  ];

  newPromotion = new Sp_FetchEligibleEmployees().clone();
  promotionBucketList: PromotionEligibilityViewModel = new PromotionEligibilityViewModel().clone();
  promotionList: Sp_FetchEligibleEmployees [] = [];
  submitList: boolean = false;
  saveList: boolean = false;
  Submit: string = "Submit";
  allEmployee: EmployeeDTO[] = [];

  filter = {
    end: null,
    start: null,
    is_closed: undefined,
    _PageSize: 10,
    _PageNumber: 1
  }
  tableActions: TableAction[] = [];
  totalItems = 0;
  currentPage = 1;
  loading: boolean = false;
  modificationStatus: boolean = false;
  eligibilityBucket: boolean = false;
  allPositions: Position[] = [];
  gOptions = {
    promotionRuleId: 0,
    promotionCategoryId: 0,
    promotionTargetId: 0
  }
  constructor(private promotion: GetEligibilityListServiceProxy, private alert: AlertserviceService,private router:Router,
    private activatedroute: ActivatedRoute, private GetPromotionEligibilityListsService: GetPromotionEligibilityListsServiceProxy,
    private CommonService: CommonServiceProxy,private updateEligibility: AddUpdateEligibleBucketServiceProxy) { }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {

      this.modificationStatus = true;
    }
    if (event.name == "2") {
      let empFname = event.data.first_name + event.data.last_name;
      this.alert.openModalAlert(this.alert.ALERT_TYPES.CONFIRM, empFname, 'Yes').subscribe(data => {
        if (data == "closed") {
          let empPromoIndex = this.promotionBucketList.eligibles.findIndex(x => x.id == event.data.id);
          this.promotionBucketList.eligibles.splice(empPromoIndex, 1);
          this.UpdateEligibleBucket();
        }

      })
    }
    if (event.name == "3") {
   this.router.navigate(['employeemodule/promotioninfo'],{queryParams:{data:event.data}})
    }
     }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getPromotionList();
  }
  get showEmpty() {
    return this.promotionList.length === 0;
  }
  ngOnInit(): void {
    this.getPromotionList();
    this.getPositions();
  }

  addEmployeetoBucketList() {
    this.allEmployee.forEach(value => {
      let newEliObjt = new Sp_FetchEligibleEmployees().clone();
      newEliObjt.next_position_id = this.gOptions.promotionTargetId
      newEliObjt.current_position_parent_id
      newEliObjt.current_parent_position
      newEliObjt.employee_contract_id = value.employeeContractId
      newEliObjt.eligiblility_id = this.promotionBucketList.id
      newEliObjt.date_of_birth = value.dateOfBirth
      newEliObjt.first_name = value.firstName
      newEliObjt.last_name = value.lastName
      newEliObjt.other_names = value.otherNames
      newEliObjt.profile_pic = value.profilePic
      this.promotionBucketList.eligibles.push(newEliObjt);
    });
    this.UpdateEligibleBucket();
  }
  UpdateEligibleBucket() {
    this.loading = true;
    this.updateEligibility.addUpdateEligibleBucket(this.promotionBucketList).subscribe(data => {
      if (!data.hasError) {
        this.getPList();
      this.submitList = false;
      this.alert.openModalAlert(this.alert.ALERT_TYPES.SUCCESS, data.message, 'OK');
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

  async getPromotionList() {
    this.loading = true;
    this.activatedroute.queryParams.subscribe(async data => {
      if (data) {
        if (data.data) {
          this.eligibilityBucket = true;
          this.promotionBucketList = JSON.parse(data.data);
          this.promotionList = this.promotionBucketList.eligibles;
          this.showTableAction = true;
          this.tableActions = [
            { name: ACTIONS.VIEW, label: 'View' },
            { name: ACTIONS.DELETE, label: 'Delete' },
            
          ]
        }
        this.loading = false;
      } else {
        this.eligibilityBucket = false;
        this.showTableAction = true;
        this.tableActions =[
          { name: ACTIONS.VIEW, label: 'View' },
        ]
        this.getPList();
      }
    });
 
  }

  async getPList() {
    this.loading = true;
    const data = await this.GetPromotionEligibilityListsService.getPromotionEligibilityLists(this.filter._PageSize, this.filter._PageNumber, this.filter.is_closed, this.filter.start, this.filter.end).toPromise();
    if(!data.hasError){
      this.promotionList = data.result;
      console.log(this.promotionList)
    }
    else{
    this.alert.openModalAlert('Error', 'Error fetching data', 'Dismiss')
    }
    this.loading = false;
  }
  getPositions() {
    this.CommonService.getPositions().subscribe(data => {
      if (!data.hasError) {
        this.allPositions = data.result;
      }else{}
      
    })
}
  gotoelegibilitybucket() {
    this.router.navigate(['/employeemodule/eligible'])
  }
  updateEligibilityList() {
    this.submitList = true;
  }
   getSelectedEmployee(event:EmployeeDTO[]=[]) {
     this.allEmployee = event;
  }
}
