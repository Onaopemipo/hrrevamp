import { Component, OnInit } from "@angular/core";
import {
  AddUpdateVendorServiceProxy,
  DataServiceProxy,
  ManageBenefitTypeDTO,
  IDTextViewModelIListApiResult,
  ManageVendorDTO,
  IDTextViewModel,
  AddUpdateVendorPlanServiceProxy,
  ManageVendorPlanDto,
  GetVendorByIdServiceProxy,
  VendorDTO,
  GetAllVendorServiceProxy,
  DeleteVendorServiceProxy,
  CommonServiceProxy,
  AddUpdateBenefitTypeServiceProxy,
  FetchAllBenefitTypesServiceProxy,
  BenefitTypeDTO,
  
} from "../../../../_services/service-proxies";
import { AlertserviceService } from "app/_services/alertservice.service";
import {
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";
import { FormGroup } from "@angular/forms";
import { Event } from "../../../../_services/service-proxies";
import { ThrowStmt } from "@angular/compiler";
import { Router, ActivatedRoute } from "@angular/router";

import { ColumnTypes } from "app/components/tablecomponent/models";
import { I } from "@angular/cdk/keycodes";

enum TABLE_ACTION {
  VIEW = "1",
  DELETE = "2",
  EDIT = "3",
}

@Component({
  selector: "ngx-benefit-type",
  templateUrl: "./benefit-type.component.html",
  styleUrls: ["./benefit-type.component.scss"],
})
export class BenefitTypeComponent implements OnInit {
  Benefit:  BenefitTypeDTO[]= [];
  loading:boolean= true
  showBenefit:boolean = false;
  submitbtnPressed:boolean = false ;
  AddBenefit = new ManageBenefitTypeDTO().clone();
  tableColumns = [
    { name: "name", title: "Name", type: ColumnTypes.Text },
    { name: "dateCreated", title: "Date Created", type: ColumnTypes.Date },
    { name: "description", title: "Description", type: ColumnTypes.Text },
    // { name: "", title: "Status", type: ColumnTypes.Status },
  ];

  topActionButtons = [
    {
      name: "add_benefit",
      label: "Create Benefit Type",
      icon: "plus",
      outline: true,
    },
  ];

  tableActions: TableAction[] = [
    // { name: TABLE_ACTION.VIEW, label: "View" },
    // { name: TABLE_ACTION.EDIT, label: "UpdateList" },
    { name: TABLE_ACTION.DELETE, label: "Delete" },
  ];
  constructor(
    private DataServiceProxy: DataServiceProxy,
    private FetchAllBenefitTypesServiceProxy: FetchAllBenefitTypesServiceProxy,
    private AddUpdateBenefitTypeServiceProxy:AddUpdateBenefitTypeServiceProxy,
    private alertservice:AlertserviceService
  ) {}

  ngOnInit(): void {
    this.getBenefits();
  }

  get showEmpty() {
    return this.Benefit.length === 0;
  }

  async getBenefits() {
    this.loading= true
    const data = await this.FetchAllBenefitTypesServiceProxy.getAllBenefitTypes().toPromise();
    if (!data.hasError) {
      this.Benefit = data.result;
      this.loading = false
      console.log(
        "i want see wetin i keep for that benefit variable",
        this.Benefit
      );
    }
  }


  get disabled() {
    if (this.AddBenefit.name && this.AddBenefit.description) return true;
    return false;
  }


    //BenefitType Add
    async SubmitBenefitType() {
      this.submitbtnPressed = true;
      const data =
        await this.AddUpdateBenefitTypeServiceProxy.addUpdateBenefitType(
          this.AddBenefit
        ).toPromise();
      if (!data.hasError) {
        this.alertservice.openModalAlert(
          this.alertservice.ALERT_TYPES.SUCCESS,
          data.message,
          "OK"
        );
        
        this.submitbtnPressed = false;
      } else {
        this.alertservice.openModalAlert(
          this.alertservice.ALERT_TYPES.FAILED,
          data.message,
          "OK"
        );
      }
    }

  tableActionClicked($event) {}
  pageActionClicked(event) {
    if(event == 'add_benefit'){
      this.showBenefit = true
    }
  }
}
