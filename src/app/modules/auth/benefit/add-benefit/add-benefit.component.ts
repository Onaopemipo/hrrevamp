import { Component, OnInit } from "@angular/core";
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
  EmployeeDTO,
  CommonServiceProxy,
  FetchAllEmployeesServiceProxy,
  GetAllVendorServiceProxy,
  VendorPlanDTO,
  ManageBenefitPlanDTO,
  GetVendorPlanByVendorIdServiceProxy,
  AddUpdateBenefitTypeServiceProxy,
  ManageBenefitTypeDTO,
  GetAllVendorPlanServiceProxy,
  VendorPlan,
  AddUpdateBenefitServiceProxy,
  FetchBenefitEligibilitiesServiceProxy,

} from "../../../../_services/service-proxies";
import { FormGroup } from "@angular/forms";
import { AlertserviceService } from "app/_services/alertservice.service";
// import { J } from "@angular/cdk/keycodes";

@Component({
  selector: "ngx-add-benefit",
  templateUrl: "./add-benefit.component.html",
  styleUrls: ["./add-benefit.component.scss"],
})
export class AddBenefitComponent implements OnInit {
  Alleligibilities: IDTextViewModel[] = [];
  selectedOption: string = "1";
  AllVendors: VendorDTO[];
  AllEmployee: EmployeeDTO[];
  searchText?: string = "a";
  pageSize?: number = 1000;
  pageNum?: number = 1;
  contractStatus?: number = 1;
  AddBenefit = new ManageBenefitTypeDTO().clone();
  employees = [];
  benefit = new ManageBenefitPlanDTO().clone();
  EventForm: FormGroup;
  plans: VendorPlanDTO[] = [];
  showPlan: boolean = false;
  submitbtnPressed: boolean = false;
  Vendorid: any = 5;
  AllPlans: VendorPlan[] = [];
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  topActionButtons = [
    {
      name: "add_leave_year",
      label: "Create Benefit Type",
      icon: "plus",
      outline: true,
    },
  ];

  modal(event) {
    if (event == "add_leave_year") {
      this.showPlan = !this.showPlan;
    }
  }
  // validation for benefit Type
  get disable() {
    if (this.AddBenefit.name) return true;
    return false;
  }
  constructor(
    private GetAllVendorServiceProxy: GetAllVendorServiceProxy,
    private FetchAllEmployeesServiceProxy: FetchAllEmployeesServiceProxy,
    private GetVendorPlanByVendorIdServiceProxy: GetVendorPlanByVendorIdServiceProxy,
    private AddUpdateBenefitTypeServiceProxy: AddUpdateBenefitTypeServiceProxy,
    private alertservice: AlertserviceService,
    private GetAllVendorPlanServiceProxy: GetAllVendorPlanServiceProxy,
    private AddUpdateBenefitServiceProxy: AddUpdateBenefitServiceProxy,
    private FetchBenefitEligibilitiesServiceProxy: FetchBenefitEligibilitiesServiceProxy
  ) {}

  ngOnInit(): void {
    this.getAllVendor();
    this.getPlans();
    this.getAllPlans();
    this.getAllEligibilities();
  }
  //Gey ALL vendors
  async getAllVendor() {
    var bId = undefined;
    const data = await this.GetAllVendorServiceProxy.getAllVendor(bId).toPromise();
    if (!data.hasError) {
      this.AllVendors = data.result;
      console.log(
        "i want see wetin i keep for that vendora variable",
        this.AllVendors
      );
      this.Vendorid = this.AllVendors.map(
        (vendors) => (this.Vendorid = vendors.id)
      );
      console.log("ids", this.Vendorid);
    }
  }

  get disabled() {
    if (
      this.benefit.name &&
      this.benefit.vendorId &&
      this.benefit.vendorPlanId &&
      this.benefit.employees &&
      this.benefit.description
    )
      return true;
    return false;
  }

  // async getAllEmployee() {
  //   const data = await this.FetchAllEmployeesServiceProxy.getAllEmployees(
  //     this.searchText,
  //     this.contractStatus,
  //     this.pageSize,
  //     this.pageNum
  //   ).toPromise();
  //   if (!data.hasError) {
  //     this.AllEmployee = data.result;

  //     this.id = data.result.map((employee) => JSON.stringify(employee.id));
  //     console.log("id", this.id);
  //   }

  //   console.log(
  //     "i want see wetin i keep for that vendora variable",
  //     this.AllEmployee,
  //     this.id
  //   );
  // }
  //employee master search
  employeesSelected(employees: EmployeeDTO[]) {
    this.employees = employees.map((employee) => JSON.stringify(employee.id));
    console.log("employee", this.employees);
  }

  getSelectedEmployee(event, selectType) {
    if (selectType == "employee") {
      event.forEach((eve) => {
        var id = eve.id;
        var idString = id.toString();
        this.benefit.employees = idString;
      });

      console.log("benben", this.benefit.employees);
    }
  }
  //get all PLans

  async getAllPlans() {
    const data =
      await this.GetAllVendorPlanServiceProxy.getAllVendorPlan().toPromise();
    if (!data.hasError) {
      this.AllPlans = data.result;
      console.log("plano", this.AllPlans);
    }
  }
  //get plans by vendor id
  async getPlans() {
    const data =
      await this.GetVendorPlanByVendorIdServiceProxy.getVendorPlanByVendorId(
        this.Vendorid
      ).toPromise();
    if (!data.hasError) {
      this.plans = data.result;
      console.log("plan", this.plans, this.benefit.vendorId);
    }
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

  filtertabConf() {}

  //Create Benefit

  async SubmitBenefit() {
    this.submitbtnPressed = true;
    const data = await this.AddUpdateBenefitServiceProxy.addUpdateBenefit(
      this.benefit
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
    this.submitbtnPressed = false;
  }

  handleVendor(vendorId) {
    this.GetVendorPlanByVendorIdServiceProxy.getVendorPlanByVendorId(vendorId)
      .toPromise()
      .then((data) => {
        if (!data.hasError) {
          this.plans = data.result;
          console.log("plan", this.plans);
        }
      })
      .catch((error) => error.message);
  }

  //get all eligibilities
  async getAllEligibilities() {
    const data =
      await this.FetchBenefitEligibilitiesServiceProxy.getBenefitEligibilities().toPromise();
    if (!data.hasError) {
      this.Alleligibilities = data.result;
      console.log("alleligiblioooo", this.Alleligibilities);
    }
  }
}
