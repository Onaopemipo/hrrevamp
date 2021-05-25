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
  AddUpdateBenefitTypeServiceProxy

} from "../../../../_services/service-proxies";
import { AlertserviceService } from "app/_services/alertservice.service";
import {
  ColumnTypes,
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";
import { FormGroup } from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";


enum ACTIONS {
  EDIT = "1",
  DELETE = "2",
}
@Component({
  selector: "ngx-vendor-plan",
  templateUrl: "./vendor-plan.component.html",
  styleUrls: ["./vendor-plan.component.scss"],
})
export class VendorPlanComponent implements OnInit {
  showLeaveYearModal: boolean = false;
  submitbtnPressed: boolean = false;
  EventForm: FormGroup;
  loading: boolean = false;
  showEvent: boolean = false;
  Event;
  singleVendor: VendorDTO;
  showPlan: boolean = false;
  Benefit: IDTextViewModel[] = [];
  Vendora = [];
  AddVendor = new ManageVendorDTO().clone();
  AddVendorPlan = new ManageVendorPlanDto().clone();
  AllVendors: VendorDTO[];
  showBenefit:boolean = false;
  AddBenefit = new ManageBenefitTypeDTO().clone();

  // tableActions: TableAction[] = [
  topActionButtons = [
    {
      name: "add_leave_year",
      label: "Create Vendor",
      icon: "plus",
      outline: false,
    },

    {
      name: "add_plan",
      label: "Create Plans",
      icon: "plus",
      outline: true,
    },
    {
      name: "add_benefit",
      label: "Create Benefit Type",
      icon: "plus",
      outline: true,
    },
  ];
  onClick() {
    alert("helllo");
  }
  constructor(
    private AddUpdateVendorServiceProx: AddUpdateVendorServiceProxy,
    private DataServiceProxy: DataServiceProxy,
    private alertservice: AlertserviceService,
    private common: CommonServiceProxy,
    private AddUpdateVendorPlanServiceProxy: AddUpdateVendorPlanServiceProxy,
    private GetVendorByIdServiceProxy: GetVendorByIdServiceProxy,
    private GetAllVendorServiceProxy: GetAllVendorServiceProxy,
    private DeleteVendorServiceProxy: DeleteVendorServiceProxy,
    private router:Router,
    private AddUpdateBenefitTypeServiceProxy: AddUpdateBenefitTypeServiceProxy,
  ) {}

  ngOnInit(): void {
    this.getBenefits();
    this.getVendor();
    this.getSingleVendor();
    this.getAllVendor();
    
  }

  
  modal(event) {
    if (event == "add_leave_year") {
      this.showEvent = true;
    }

    if (event == "add_plan") {
      this.showPlan = true;
    }
    if (event == "add_benefit") {
      this.showBenefit = !this.showBenefit
    }
  }

  AddPlan() {
    alert("hello world");
    this.showPlan = true;
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
  //VALIDATION FOR VENDOR
  get disableEvent() {
    if (
      this.AddVendor.name &&
      this.AddVendor.phoneNumber &&
      this.AddVendor.address &&
      this.AddVendor.email //&&
      //this.AddVendor.benefitTypeID
    )
      return true;
    return false;
  }
  // Validatuion For AddPlan to vendors
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
  //validation for benefit type
  get disabled() {
    if (this.AddBenefit.name) return true;
    return false;
  }
  //vendor add
  async SubmitEvent() {
    this.submitbtnPressed = true;
    const data = await this.AddUpdateVendorServiceProx.addUpdateVendor(
      this.AddVendor
    ).toPromise();
    if (!data.hasError) {
      this.alertservice.openModalAlert(
        this.alertservice.ALERT_TYPES.SUCCESS,
        data.message,
        "OK"
      );
      this.submitbtnPressed = false;
      this.showEvent = false
    } else {
      this.alertservice.openModalAlert(
        this.alertservice.ALERT_TYPES.FAILED,
        data.message,
        "OK"
      );
    }
    this.showEvent = false
  }
  //add plan

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

  async getVendor() {
    // const data = await this.common.getVendor().toPromise();
    // if (!data.hasError) {
    //   this.Vendora = data.result;
    //   console.log(
    //     "i want see wetin i keep for that vendora variable",
    //     this.Vendora,
    //     this.AddVendorPlan.vendorId
    //   );
    // }
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

  async getSingleVendor() {
    const data = await this.GetVendorByIdServiceProxy.getVendorById(
      4
    ).toPromise();
    if (!data.hasError) {
      this.singleVendor = data.result;

      console.log("singles", this.singleVendor, this.AddVendorPlan.vendorId);
    }
  }
  vendorId:number = 0
  async getAllVendor() {
    var bId = undefined;
    const data = await this.GetAllVendorServiceProxy.getAllVendor(bId).toPromise();
    if (!data.hasError) {
      this.AllVendors = data.result;
      const vendorId = this.AllVendors.map(vendor=>{
        let vend = Number(vendor.id)
        this.vendorId = vend
         console.log('vendor ids',this.vendorId)
      })
      console.log(
        "i want see wetin i keep for that vendora variable",
        this.AllVendors
      );
    }
  }

   async deleteVendor() {
    this.alertservice
    .openModalAlert(
      this.alertservice.ALERT_TYPES.CONFIRM,
      "Do you want to delete this?",
      "Yes"
    )
    .subscribe((dataAction) => {
      if (dataAction == "closed") {
        this.DeleteVendorServiceProxy.deleteVendor(
          this.vendorId
        ).subscribe((myData) => {
          if (!myData.hasError && myData.result.isSuccessful == true) {
            this.alertservice
              .openModalAlert(
                this.alertservice.ALERT_TYPES.SUCCESS,
                "Vendor has been deleted",
                "Success"
              )
              .subscribe((delData) => {
                if (delData)
                  this.router.navigateByUrl("/benefits/BenefitsVendor");
              });
          }
        });
      }
    });


    const data = await this.DeleteVendorServiceProxy.deleteVendor(this.vendorId).toPromise()
    if(!data.hasError){
      this.alertservice.openModalAlert(
        this.alertservice.ALERT_TYPES.SUCCESS,
        data.message,
        "OK")
    }
  }
}
