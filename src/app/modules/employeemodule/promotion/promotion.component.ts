import { AlertserviceService } from './../../../_services/alertservice.service';
import { AddUpdateEligibleBucketServiceProxy, CommonServiceProxy, EmployeeDTO, GetPromotionEligibilityListsServiceProxy, GetPromotionListsServiceProxy, Position, PromotionEligibilityViewModel, Sp_FetchEligibleEmployees } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { ActivatedRoute, Router } from '@angular/router';
import { IStatus, MyColor } from 'app/components/status/models';

export class eliWithStatus extends Sp_FetchEligibleEmployees implements IStatus {
  eliWithSt: Sp_FetchEligibleEmployees;

  constructor(eliWithSt: Sp_FetchEligibleEmployees) {
    super(eliWithSt);
    this.eliWithSt = eliWithSt;

  }
  get status() {
    return this.eliWithSt.log_status_id;
  }
  getStatusLabel() {
    if (this.eliWithSt.log_status_id === 1) return 'Pending';
    if (this.eliWithSt.log_status_id === 2) return 'Approved';
    if (this.eliWithSt.log_status_id === 3) return 'Rejected';
    if (this.eliWithSt.is_submitted) return 'YES';
    if (!this.eliWithSt.is_submitted) return 'NO';

  }
  getStatusColor() {
    if (this.eliWithSt.log_status_id === 1) return new MyColor(242, 153, 74);
    if (this.eliWithSt.log_status_id ===2) return new MyColor(0, 153, 74);
    if (this.eliWithSt.log_status_id === 3) return new MyColor(242, 0, 74);
    if (this.eliWithSt.is_submitted) return new MyColor(0, 153, 74);
    if (!this.eliWithSt.is_submitted) return new MyColor(242, 0, 74);
    return new MyColor(253, 238, 238);
  }
}

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
    { name: 'employee_name', title: 'EMPLOYEE',type:ColumnTypes.Text },
    { name: 'current_position', title: 'PREVIOUS ROLE',type:ColumnTypes.Text },
    { name: 'years_in_current_grade', title: 'PERIOD SPENT',type:ColumnTypes.Text },
    { name: 'next_position', title: 'NEXT POSITION',type:ColumnTypes.Text },
    { name: 'last_promotion_date', title: 'LAST PROMOTION', type: ColumnTypes.Date },
    { name: 'is_submitted', title: 'SUBMITTED',type: ColumnTypes.Text },
    { name: 'log_status_id', title: 'STATUS',type: ColumnTypes.Status },
  ];

  newPromotion = new Sp_FetchEligibleEmployees().clone();
  promotionBucketList: PromotionEligibilityViewModel = new PromotionEligibilityViewModel().clone();
  promotionList = [];
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
    promotionTargetId: 0,
    comments:''
  }

  Eligibilityfilter = {
    end: null,
    start: null,
    is_closed: undefined,
    _PageSize: 10,
    _PageNumber: 1,
    EligibilityId: undefined
  }
  loadingEligibilty: boolean = false;
  constructor(private alert: AlertserviceService,private router:Router,private GetPromotionListsService: GetPromotionListsServiceProxy,
    private activatedroute: ActivatedRoute, private GetPromotionEligibilityListsService: GetPromotionEligibilityListsServiceProxy,
    private CommonService: CommonServiceProxy,private updateEligibility: AddUpdateEligibleBucketServiceProxy) { }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {

      this.modificationStatus = true;
    }
    if (event.name == "2") {
      let empFname = event.data.employee_name;
      this.alert.openModalAlert(this.alert.ALERT_TYPES.CONFIRM, empFname, 'Yes').subscribe(data => {
        if (data == "closed") {
          let empPromoIndex = this.promotionBucketList.eligibles.findIndex(x => x.id == event.data.id);
          this.promotionBucketList.eligibles.splice(empPromoIndex, 1);
       //   this.UpdateEligibleBucket();
        }

      })
    }
    if (event.name == "3") {
   this.router.navigate(['employeemodule/promotioninfo'],{queryParams:{data:JSON.stringify(event.data)}})
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
      newEliObjt.employee_id = value.id;
      newEliObjt.next_position_id = this.gOptions.promotionTargetId;
      newEliObjt.employee_contract_id = value.employeeContractId;
      newEliObjt.eligiblility_id = this.promotionBucketList.id;
      newEliObjt.date_of_birth = value.dateOfBirth;
      newEliObjt.first_name = value.firstName;
      newEliObjt.last_name = value.lastName;
      newEliObjt.other_names = value.otherNames;
      newEliObjt.profile_pic = value.profilePic;
      newEliObjt.comments = this.gOptions.comments;
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
      console.log(data)
      if (data) {
        if (data.data) {
          this.eligibilityBucket = true;
          this.loading = true;
          this.promotionBucketList = JSON.parse(data.data);
          this.pageName = this.promotionBucketList.name + " Employee List";
          this.Eligibilityfilter.EligibilityId = this.promotionBucketList.id;
          this.GetPromotionEligibilityListsService.getPromotionEligibilityLists(this.Eligibilityfilter._PageSize,
            this.Eligibilityfilter._PageNumber, this.Eligibilityfilter.EligibilityId, this.Eligibilityfilter.is_closed, this.Eligibilityfilter.start, this.Eligibilityfilter.end)
            .subscribe(data => {
              this.loading = false;
            
              var Indata = data.result[0].eligibles.map(initd=> new eliWithStatus(initd))
              this.promotionList = Indata;
             
            });
          this.showTableAction = true;
          this.tableActions = [
            { name: ACTIONS.VIEW, label: 'View' },
            { name: ACTIONS.DELETE, label: 'Delete' },
            
          ];
          this.loading = false;
        }else {
          this.eligibilityBucket = false;
          this.showTableAction = true;
          this.tableActions =[
            { name: ACTIONS.VIEW, label: 'View' },
          ]
          this.getPList();
        }        
      } 
    });
 
  }

  async getPList() {
    this.loading = true;
    const data = await this.GetPromotionListsService.getPromotionLists(undefined,this.filter._PageSize, this.filter._PageNumber).toPromise();
    if (!data.hasError) {
      var Indata = data.result.map(initd=>{ new eliWithStatus(initd)})
      this.promotionList = Indata;   
     // console.log(this.promotionList)
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
