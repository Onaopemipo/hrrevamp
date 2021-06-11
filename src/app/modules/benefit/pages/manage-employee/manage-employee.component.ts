import { Component, OnInit } from "@angular/core";
import { ColumnTypes, TableColumn } from "app/components/tablecomponent/models";
import { MainBaseComponent } from "app/components/main-base/main-base.component";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import {
  FetchBenefitEmployeesServiceProxy,
  EmployeeDTO,
} from "../../../../_services/service-proxies";
import {
  ACTIONS,
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";
import { toTypeScript } from "@angular/compiler";

enum TABS {
  NOT__COMPLETED,
  COMPLETED,
}
enum TOP_ACTIONS {}

enum TABLE_ACTION {
  VIEW = "1",
  DELETE = "2",
  EDIT = "3",
}

@Component({
  selector: "ngx-manage-employee",
  templateUrl: "./manage-employee.component.html",
  styleUrls: ["./manage-employee.component.scss"],
})
export class ManageEmployeeComponent extends MainBaseComponent {
  EmployeeBenefit: EmployeeDTO[];
  topActionButtons = [];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.NOT__COMPLETED;
  loading:boolean = true


  tableColumns = [
    { name: "employeeNumber", title: "ID" },
    { name: "fullName", title: "Name" },
    { name: "positionName", title: "Position" },
    // { name: "date", title: "Job Type" },
  ];

  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: "View" },
    // { name: TABLE_ACTION.EDIT, label: "UpdateList" },
    { name: TABLE_ACTION.DELETE, label: "Delete" },
  ];

  constructor(
    private route: Router, private navCtrl: Location,
    private FetchBenefitEmployeesServiceProxy: FetchBenefitEmployeesServiceProxy
  ) {
    super();
  }
  ngOnInit(): void {
    this.GetEmployeesBenefit();
  }
  benefitId?: number = undefined;

  pageSize?: number = 1000;
  pageNumber?: number = 1;

  goback() {
    this.navCtrl.back();
  }
  async GetEmployeesBenefit() {
    this.loading = true

    const data =
      await this.FetchBenefitEmployeesServiceProxy.getBenefitEmployees(
        this.benefitId,
        this.pageSize,
        this.pageNumber
      ).toPromise();
      this.loading = false;
    if (!data.hasError) {
      this.EmployeeBenefit = data.result;
      this.data = data.result;
      console.log("empoooo", this.EmployeeBenefit);
    }
  }

  tableActionClicked(event){
    if(event.name == TABLE_ACTION.VIEW){
    return  this.route.navigate (['/benefits/employee',event.data.id])
    }

  }
}
