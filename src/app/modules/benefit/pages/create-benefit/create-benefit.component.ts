import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbUser } from "@nebular/auth";
import {
  AddUpdateVendorServiceProxy,
  DataServiceProxy,
  IDTextViewModelIListApiResult,
  ManageVendorDTO,
  IDTextViewModel,
  AddUpdateVendorPlanServiceProxy,
  ManageVendorPlanDto,
  GetVendorByIdServiceProxy,
  VendorDTO,
  CommonServiceProxy,
  GetAllVendorServiceProxy,
  VendorPlanDTO,
  GetVendorPlanByVendorIdServiceProxy
} from "../../../../_services/service-proxies";
import { FormGroup } from "@angular/forms";
import { AlertserviceService } from "app/_services/alertservice.service";

@Component({
  selector: "ngx-create-benefit",
  templateUrl: "./create-benefit.component.html",
  styleUrls: ["./create-benefit.component.scss"],
})
export class CreateBenefitComponent implements OnInit {
  Vendora = [];
  AllVendors: VendorDTO[];
  VendorId: number = 0;
  singleVendor: VendorDTO;

  EventForm: FormGroup;
  showPlan: boolean = false;
  submitbtnPressed: boolean = false;
  AddVendorPlan = new ManageVendorPlanDto().clone();
  plans: VendorPlanDTO[] = [];
  constructor(
    private common: CommonServiceProxy,
    private GetAllVendorServiceProxy: GetAllVendorServiceProxy,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private GetVendorByIdServiceProxy: GetVendorByIdServiceProxy,
    private alertservice: AlertserviceService,
    private AddUpdateVendorPlanServiceProxy: AddUpdateVendorPlanServiceProxy,
    private GetVendorplanByVendorIdServiceProxy:GetVendorPlanByVendorIdServiceProxy
  ) // ,

  {}

  // tableActions: TableAction[] = [
  topActionButtons = [
    {
      name: "add_leave_year",
      label: "Add Plans",
      icon: "plus",
      outline: true,
    },
  ];

  modal(event) {
    if (event == "add_leave_year") {
      this.showPlan = true;
    }
  }
  back() {
    return this.route.navigate(["/benefits/BenefitsVendor"]);
  }

  get disable() {
    if (
      this.AddVendorPlan.name &&
      this.AddVendorPlan.vendorId &&
      this.AddVendorPlan.description &&
      this.AddVendorPlan.refNumber
    )
      return true;
    return false;
  }
  ngOnInit(): void {
    
    this.getAllVendor();

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        //if the urlparams does not have that id i wasnt to just redirect or navigate to the home page
        return this.route.navigate(["/BenefitsVendor"]);
      }
      const vendorId = paramMap.get("id");
      const vend = Number(vendorId);

      this.VendorId = vend;
      console.log("id", this.VendorId);
      this.getSingleVendor();
    });
    this.getPlans();
  }
  //get single vendor
  async getSingleVendor() {
    const data = await this.GetVendorByIdServiceProxy.getVendorById(
      this.VendorId
    ).toPromise();
    if (!data.hasError) {
      this.singleVendor = data.result;
      console.log("singleVendor", this.singleVendor);
    }
  }

  //getVendor
  // async getVendor() {
  //   const data = await this.common.getVendor().toPromise();
  //   if (!data.hasError) {
  //     this.Vendora = data.result;
  //     console.log(
  //       "i want see wetin i keep for that vendora variable",
  //       this.Vendora
  //     );
  //   }
  // }

  //get all vendors
  async getAllVendor() {
    const data = await this.GetAllVendorServiceProxy.getAllVendor().toPromise();
    if (!data.hasError) {
      this.AllVendors = data.result;
      console.log(
        "All vendors",
        this.AllVendors
      );
    }
  }
  // AddPlan(){
  //   this.showPlan = true
  // }

  deletePlan() {}
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
  //fetch plans by vendor
  async getPlans() {
    const data = await this. GetVendorplanByVendorIdServiceProxy.getVendorPlanByVendorId(this.VendorId).toPromise();
   if(!data.hasError){
       this.plans = data.result
       console.log('plan',this.plans)
    }
  }
}
