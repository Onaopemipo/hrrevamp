import { Component, OnInit } from "@angular/core";
import { IRequiredButton } from "app/components/componentsheader/componentsheader.component";
import {
  FetchEmployeeCoverageBenefitServiceProxy,
  VendorDTO,
  GetAllVendorPlanServiceProxy,
  GetVendorPlanByVendorIdServiceProxy,
  FetchAllBenefitsServiceProxy,
  BenefitPlanDTO,
  GetAllVendorServiceProxy,
  VendorPlanDTO,
  DeleteBenefitEligibilityServiceProxy,
  DeleteBenefitServiceProxy,
} from "../../../../_services/service-proxies";
import { Router } from "@angular/router";
import { AlertserviceService } from "app/_services/alertservice.service";


@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  topActionButtons: IRequiredButton[] = [
    { name: "manage", label: "Manage Employees", outline: false, icon: "" },
    { name: "create", label: "Create Benefit", outline: true, icon: "" },
  ];
  loading = false;
  constructor(
    private benefitscoverages: FetchEmployeeCoverageBenefitServiceProxy,
    private route: Router,
    private FetchAllBenefitsServiceProxy: FetchAllBenefitsServiceProxy,
    private GetVendorplanByVendorIdServiceProxy: GetVendorPlanByVendorIdServiceProxy,
    private GetAllVendorServiceProxy: GetAllVendorServiceProxy,
    private GetAllVendorPlanServiceProxy: GetAllVendorPlanServiceProxy,
    private DeleteBenefitEligibilityServiceProxy: DeleteBenefitEligibilityServiceProxy,
    private DeleteBenefitServiceProxy: DeleteBenefitServiceProxy,
    private alertservice: AlertserviceService,
    private router: Router
  ) { }
  get showEmpty() {
    return this.allBenefito.length === 0;
  }
  totalBudget = 1000000;

  ngOnInit(): void {
    // this.getBenefitsCoverage();
    this.fetchBenefits();
    this.getAllVendor();
    this.getPlans();
  }

  iD: number = 0;
  coverageName?: string = "";
  companyID?: number = 1;
  employeeID?: number = 1;
  subID?: number = 0;
  pageNumber?: number = 1;
  pageSize?: number = 1000;
  coveragePlanId?: number = 0;
  eligibilityTypeId?: number = 0;
  vendorId?: number = 0;
  vendorPlanId?: number = 0;
  allBenefito: BenefitPlanDTO[] = [];
  AllVendors: VendorDTO[] = [];
  plans: VendorPlanDTO[] = [];

  async getAllVendor() {
    const data = await this.GetAllVendorServiceProxy.getAllVendor(undefined).toPromise();
    if (!data.hasError) {
      this.AllVendors = data.result;
      const vendorId = this.AllVendors.map((vendor) => {
        let vend = Number(vendor.id);
        this.vendorId = vend;
        console.log("vendor ids", this.vendorId);
      });
      // this.getPlansbyVendor();
      // console.log(
      //   "i want see wetin i keep for that vendora variable",
      //   this.AllVendors
      // );
    }
  }
  //get all employee coverages
  async getBenefitsCoverage() {
    const CoverageData = await this.benefitscoverages
      .fetchEmployeeCoverageBenefit(
        this.iD,
        this.coverageName,
        this.coveragePlanId,
        this.employeeID,
        this.subID,
        this.eligibilityTypeId,
        this.subID,
        this.pageNumber,
        this.pageSize
      )
      .toPromise();
    if (!CoverageData.hasError) {
      console.log("my coveragedATA", CoverageData);
    }
  }

  modal(event) {
    if (event == "manage") {
      this.route.navigateByUrl("/benefits/manage-employee");
    }

    if (event == "create") {
      this.route.navigateByUrl("/benefits/addBenefit");
    }
  }

  async fetchBenefits() {
    this.loading = true;
    const data = await this.FetchAllBenefitsServiceProxy.fetchAllBenefits(
      this.vendorId,
      this.vendorPlanId,
      this.pageSize,
      this.pageNumber
    ).toPromise();
    if (!data.hasError) {
      this.loading = false;
      this.allBenefito = data.result;
      console.log("beneitoto", this.allBenefito);
    } else {
      this.loading = false;
    }
  }
  async getPlans() {
    const data =
      await this.GetAllVendorPlanServiceProxy.getAllVendorPlan().toPromise();
    if (!data.hasError) {
      console.log("plans", data.result);
    }
  }

  // async getPlansbyVendor() {
  //   const data =
  //     await this.GetVendorplanByVendorIdServiceProxy.getVendorPlanByVendorId(
  //       {...this.vendorId}
  //     ).toPromise();
  //   if (!data.hasError) {
  //     this.plans = data.result;
  //     console.log("plan", this.plans);
  //   }
  // }

    deleteBenefit(id){

      this.alertservice
      .openModalAlert(
        this.alertservice.ALERT_TYPES.CONFIRM,
        "Do you want to delete this?",
        "Yes"
      )
      .subscribe((dataAction) => {
        if (dataAction == "closed") {
          this.DeleteBenefitServiceProxy.deleteBenefit(
            id
          ).subscribe((myData) => {
            if (!myData.hasError && myData.result.isSuccessful == true) {
              this.alertservice
                .openModalAlert(
                  this.alertservice.ALERT_TYPES.SUCCESS,
                  "Benefit has been deleted",
                  "Success"
                  
                )
                .subscribe(delData => {
                  if (delData){
                    this.router.navigateByUrl("/benefits");
                  }
                
                  
                });
            }
          });
        }
      });


    }
      
}
