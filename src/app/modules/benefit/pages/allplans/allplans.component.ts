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
  GetAllVendorPlanServiceProxy,
  VendorPlan,
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
@Component({
  selector: "ngx-allplans",
  templateUrl: "./allplans.component.html",
  styleUrls: ["./allplans.component.scss"],
})
export class AllplansComponent implements OnInit {
  Plans: VendorPlan[] = [];
  loading: boolean = true;
  showPlan: boolean = false;
  submitbtnPressed: boolean = false;
  EventForm: FormGroup;
  AllVendors: VendorDTO[] = [];
  AddVendorPlan = new ManageVendorPlanDto().clone();
  vendorId: number = 0;
  id? = undefined;
  Benefit: IDTextViewModel[] = [];
  constructor(
    private GetAllVendorPlanServiceProxy: GetAllVendorPlanServiceProxy,
    private AddUpdateVendorPlanServiceProxy: AddUpdateVendorPlanServiceProxy,
    private GetAllVendorServiceProxy: GetAllVendorServiceProxy,
    private DataServiceProxy: DataServiceProxy,
    private alertservice: AlertserviceService
  ) {}

  ngOnInit(): void {
    this.GetallPlans();
    this.getAllVendor();
    this.getBenefits();
  }

  tableColumns = [
    { name: "name", title: "Name", type: ColumnTypes.Text },
    { name: "dateCreated", title: "Date Created", type: ColumnTypes.Date },
    { name: "description", title: "Description", type: ColumnTypes.Text },
    // { name: "", title: "Status", type: ColumnTypes.Status },
  ];

  get disable() {
    if (
      this.AddVendorPlan.name &&
      this.AddVendorPlan.vendorId &&
      this.AddVendorPlan.description &&
      this.AddVendorPlan.refNumber &&
      this.AddVendorPlan.companyPercent &&
      this.AddVendorPlan.companyPercentCost &&
      this.AddVendorPlan.employeePercent &&
      this.AddVendorPlan.employeePercentCost
    )
      return true;
    return false;
  }

  topActionButtons = [
    {
      name: "add_benefit",
      label: "Create Plans",
      icon: "plus",
      outline: true,
    },
  ];

  get showEmpty() {
    return this.Plans.length === 0;
  }

  async getBenefits() {
    const data = await this.DataServiceProxy.getBenefitType().toPromise();
    if (!data.hasError) {
      this.Benefit = data.result;
      console.log(
        "i want see wetin i keep for that benefit variable",
        this.Benefit
      );
    }
  }

  async GetallPlans() {
    this.loading = true;
    const data =
      await this.GetAllVendorPlanServiceProxy.getAllVendorPlan().toPromise();
    if (!data.hasError) {
      this.Plans = data.result;
      this.loading = false;
      console.log("plans", this.Plans);
    }
  }

  pageActionClicked(event) {
    if (event == "add_benefit") {
      this.showPlan = true;
    }
  }
  tableActionClicked(event) {}

  async SubmitPlan() {
    this.submitbtnPressed = true;
    const data = await this.AddUpdateVendorPlanServiceProxy.addUpdateVendorPlan(
      this.AddVendorPlan
    ).toPromise();
    if (!data.hasError) {
      this.alertservice.openModalAlert(
        this.alertservice.ALERT_TYPES.SUCCESS,
        data.message,
        "OK"
      );
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

  async getAllVendor() {
    this.loading = true;
    const data = await this.GetAllVendorServiceProxy.getAllVendor(
      this.id
    ).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.AllVendors = data.result;
      const vendorId = this.AllVendors.map((vendor) => {
        let vend = Number(vendor.id);
        this.vendorId = vend;
        console.log("vendor ids", this.vendorId);
      });
      console.log(
        "i want see wetin i keep for that vendora variable",
        this.AllVendors
      );
    } else {
      this.loading = false;
    }
  }
}
