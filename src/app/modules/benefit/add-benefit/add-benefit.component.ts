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
  FetchBenefitEligibilitiesServiceProxy,
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
} from "../../../_services/service-proxies";
import { FormGroup } from "@angular/forms";
import { AlertserviceService } from "app/_services/alertservice.service";
import { J } from "@angular/cdk/keycodes";
import { Router } from "@angular/router";
import { Position,  BenefitType } from '../../../_services/service-proxies';

@Component({
  selector: "ngx-add-benefit",
  templateUrl: "./add-benefit.component.html",
  styleUrls: ["./add-benefit.component.scss"],
})
export class AddBenefitComponent implements OnInit {
  allEligibilities: IDTextViewModel[] = [];
  selectedOption = 0;
  AllVendors: VendorDTO[] = [];
  AllEmployee: EmployeeDTO[] = [];
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
  Position: Position[] =[];
  BenefitType:IDTextViewModel[]=[]
  topActionButtons = [
    {
      name: "add_leave_year",
      label: "Create Benefit Type",
      icon: "plus",
      outline: true,
    },
  ];
  back() {
    this.route.navigateByUrl("/benefits");
  }
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
  endYear: any = "";
  startYear: any = "";
  constructor(
    private GetAllVendorServiceProxy: GetAllVendorServiceProxy,
    private FetchAllEmployeesServiceProxy: FetchAllEmployeesServiceProxy,
    private GetVendorPlanByVendorIdServiceProxy: GetVendorPlanByVendorIdServiceProxy,
    private AddUpdateBenefitTypeServiceProxy: AddUpdateBenefitTypeServiceProxy,
    private alertservice: AlertserviceService,
    private GetAllVendorPlanServiceProxy: GetAllVendorPlanServiceProxy,
    private AddUpdateBenefitServiceProxy: AddUpdateBenefitServiceProxy,
    private FetchBenefitEligibilitiesServiceProxy: FetchBenefitEligibilitiesServiceProxy,
    private route: Router,
    private CommonServiceProxy: CommonServiceProxy,
    private DataServiceProxy: DataServiceProxy
  ) {}
  onDateSelection(date: Date){
    if(this.benefit.startDate){
       if(this.benefit.startDate.getFullYear() != date.getFullYear()){
this.startYear = this.benefit.startDate.getFullYear();
         this.endYear = date.getFullYear();
         let alertMsg = `Benefit End Year Spill Over to Another Year, Click Yes to set Financial Year End to ${this.endYear} and No to set ${this.startYear} as Financial Year`
this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.ANYCONFIRM, alertMsg, 'Yes').subscribe(data => {
  if (data == "closed") {
    this.benefit.financialYear = this.endYear
  } else {
    this.benefit.financialYear = this.startYear
  }

})
       }else{
        this.benefit.financialYear = date.getFullYear().toString();
       }

    }    
  }
  ngOnInit(): void {
   // this.getAllVendor();
    this.getPlans();
    this.getAllPlans();
    this.getAllEligibilities();
    this.getPosition(); 
    this.getBenefitType();
    this.benefit.financialYear = new Date().getFullYear().toString();
  }
  //Gey ALL vendors
  async getAllVendor(benefitTypeId) {
    const data = await this.GetAllVendorServiceProxy.getAllVendor(benefitTypeId).toPromise();
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
  get validdating() {
    if(this.benefit.financialYear) return true;
    return false
  }
  //startDate validation

  get validdate() {
    if (this.benefit.startDate) return true;
    return false;
  }

  //expiredate validation
  get validdated() {
    if (this.benefit.endDate) return true;
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

  //getAllELIGIBILITIES FOR DROPDOWN

  async getAllEligibilities() {
    const data =
      await this.FetchBenefitEligibilitiesServiceProxy.getBenefitEligibilities().toPromise();
    if (!data.hasError) {
      this.allEligibilities = data.result;
      console.log("i don tire ell", this.allEligibilities);
    }
  }

  //get positions 
   async getPosition(){
     const data = await this.CommonServiceProxy.getPositions().toPromise();
     if(!data.hasError){
      this.Position = data.result;
      console.log('positions',this.Position)
     }
   }
   //Get Benefut Type
   async getBenefitType() {
    const data = await this.DataServiceProxy.getBenefitType().toPromise();
    if (!data.hasError) {
      this.BenefitType = data.result;
      console.log(
        "i want see wetin i keep for that benefit variable",
        this.BenefitType
      );
    }
  }
}
