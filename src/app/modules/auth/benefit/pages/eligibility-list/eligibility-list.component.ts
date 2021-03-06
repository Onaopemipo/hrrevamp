import { Component, OnInit } from "@angular/core";
import { ColumnTypes } from "app/components/tablecomponent/models";
import { MainBaseComponent } from "app/components/main-base/main-base.component";
import {
  AddUpdateBenefitEligibilityServiceProxy,
  DeleteBenefitEligibilityServiceProxy,
  ManageBenefitEligibilityDTO,
  FetchAllEligibilitiesServiceProxy,
  BenefitEligibilityDTO,
  FetchBenefitEligibilityServiceProxy,
} from "../../../../../_services/service-proxies";
import { AlertserviceService } from "app/_services/alertservice.service";
import { Transfer } from "@flowjs/ngx-flow";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ACTIONS,
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";
enum TABS {
  OPEN,
  CLOSED,
}
enum TOP_ACTIONS {
  CREATE_NEW,
}

enum TABLE_ACTION {
  VIEW = "1",
  DELETE = "2",
  EDIT = "3",
}

@Component({
  selector: "ngx-eligibility-list",
  templateUrl: "./eligibility-list.component.html",
  styleUrls: ["./eligibility-list.component.scss"],
})
export class EligibilityListComponent extends MainBaseComponent {
  status?: number = 0;
  pageSize?: number = 1000;
  pageNumber?: number = 1;
  showPlan: boolean = false;
  submitbtnPressed: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  eligibility = new ManageBenefitEligibilityDTO().clone();
  Eligibility: BenefitEligibilityDTO[] = [];
  loading: boolean = false;
  totalItems = 0;
  currentPage = 1;

  // Eligibilty = new ManageBenefitEligibilityDTO().clone();
  topActionButtons = [
    { name: "CREATE_NEW", label: "Create new", icon: "plus", outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.OPEN;
  tableColumns = [
    { name: "name", title: "Name" },
    { name: "dateCreated", title: "Date Created" },
    { name: "generatedBy", title: "Generated By" },
    { name: "status", title: "Status" },
  ];

  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: "View" },
    { name: TABLE_ACTION.EDIT, label: "UpdateList" },
    { name: TABLE_ACTION.DELETE, label: "Delete" },
  ];

  constructor(
    private alertservice: AlertserviceService,
    private AddUpdateBenefitEligibilityServiceProxy: AddUpdateBenefitEligibilityServiceProxy,
    private router: Router,
    private FetchAllEligibilitiesServiceProxy: FetchAllEligibilitiesServiceProxy,
    private DeleteBenefitEligibilityServiceProxy: DeleteBenefitEligibilityServiceProxy,
    private FetchBenefitEligibilityServiceProxy: FetchBenefitEligibilityServiceProxy
  ) {
    super();
  }

  tableActionClicked(event: TableActionEvent) {
    if (event.name == TABLE_ACTION.DELETE) {
      this.alertservice
        .openModalAlert(
          this.alertservice.ALERT_TYPES.CONFIRM,
          "Do you want to delete this?",
          "Yes"
        )
        .subscribe((dataAction) => {
          if (dataAction == "closed") {
            this.DeleteBenefitEligibilityServiceProxy.deleteBenefitEligibility(
              event.data.id
            ).subscribe((myData) => {
              if (!myData.hasError && myData.result.isSuccessful == true) {
                this.alertservice
                  .openModalAlert(
                    this.alertservice.ALERT_TYPES.SUCCESS,
                    "Benefit Eligibilty has been deleted",
                    "Success"
                  )
                  .subscribe((delData) => {
                    if (delData)
                      this.router.navigateByUrl("/benefits/eligibility");
                  });
              }
            });
          }
        });
    }

    if (event.name == TABLE_ACTION.VIEW) {
      alert(event.data.id);
      this.router.navigateByUrl("/benefits/eligibilityView/" + event.data.id);
      // this.FetchBenefitEligibilityServiceProxy.getBenefitEligibility(event.data.id).toPromise().then(
      //   res=>
      // )
    }
  }
  getSelectedEmployee(event, selectType) {
    if (selectType == "employee") {
      event.forEach((eve) => {
        var id = eve.id;
        var idString = id.toString();
        this.eligibility.employees = idString;
      });

      console.log("benben", this.eligibility.employees);
    }
  }

  get disability() {
    if (this.eligibility.name && this.eligibility.employees) return true;
    return false;
  }
  pageActionClicked(event) {
    if (event == "CREATE_NEW") {
      this.showPlan = true;
    }
  }
  //Add benefitEligibility
  async Submit() {
    this.submitbtnPressed = true;
    const data =
      await this.AddUpdateBenefitEligibilityServiceProxy.addUpdateBenefitEligibility(
        this.eligibility
      ).toPromise();
    if (!data.hasError) {
      this.alertservice
        .openModalAlert(
          this.alertservice.ALERT_TYPES.SUCCESS,
          data.message,
          "OK"
        )
        .subscribe((datares) => {
          if (datares) {
            this.router.navigateByUrl("/benefits/eligibility");
          }
        });
      this.showPlan = false;
      this.submitbtnPressed = false;
    } else {
      this.alertservice.openModalAlert(
        this.alertservice.ALERT_TYPES.FAILED,
        data.message,
        "OK"
      );
    }
  }

  ngOnInit() {
    this.FetchAllBenefitEligibilities();
  }

  //fetch all Eligibility
  FetchAllBenefitEligibilities() {
    this.loading = true
    this.FetchAllEligibilitiesServiceProxy.fetchAllBenefitEligibilities(
      this.status,
      this.pageSize,
      this.pageNumber
    )
      .toPromise()
      .then((eligibility) => {
        // var res = eligibility.result.map(deply =>
        this.Eligibility = eligibility.result;
        this.totalItems = eligibility.totalRecord;
        this.loading = false;
        console.log("eligibilit", this.Eligibility);
      });
    // if(!data.hasError){
    //   this.Eligibility = data.result
    //   this.tableData= data.result
    //   console.log('eligibilit',this.Eligibility,this.tableData)
    // }
    this.loading = false
  }
}
