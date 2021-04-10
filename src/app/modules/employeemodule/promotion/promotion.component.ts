import { AlertserviceService } from './../../../_services/alertservice.service';
import { CommonServiceProxy, GetEligibilityListServiceProxy, GetPromotionEligibilityListsServiceProxy, Position, Sp_FetchEligibleEmployees } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ACTIONS, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  allowmultipleselection: boolean = false;
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



  promotionList: Sp_FetchEligibleEmployees [] = [];
  submitList: boolean = false;
  saveList: boolean = false;
  Submit: string = "Submit"

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
  constructor(private promotion: GetEligibilityListServiceProxy, private alert: AlertserviceService,private router:Router,
    private activatedroute: ActivatedRoute, private GetPromotionEligibilityListsService: GetPromotionEligibilityListsServiceProxy,
    private CommonService: CommonServiceProxy,) { }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == "1") {

      this.modificationStatus = true;
    }
    if (event.name == "2") {
   
    }
    if (event.name == "3") {
   
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

  async getPromotionList() {
    this.loading = true;
    this.activatedroute.queryParams.subscribe(async data => {
      if (data) {
        if (data.data) {
          this.eligibilityBucket = true;
          this.promotionList = JSON.parse(data.data);
          this.showTableAction = true;
          this.tableActions = [
            { name: ACTIONS.VIEW, label: 'View' },
            { name: ACTIONS.EDIT, label: 'Edit' },
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
    });
 
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
   getSelectedEmployee(event) {
  console.log(event)
   
  }
}
