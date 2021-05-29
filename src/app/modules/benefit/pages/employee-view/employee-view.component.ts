import { TableColumn } from "app/components/tablecomponent/models";
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
  FetchAllBenefitsServiceProxy,
  BenefitPlanDTO,
  GetVendorPlanByVendorIdServiceProxy,
  FetchEmployeeByIdServiceProxy,
  EmployeeDTO,
  AddressDTO,
  EmployeeContractAssignmentDTO,
  EmployeeHistoryDTO,
  FetchBenefitServiceProxy,
  AddEmployeeToBenefitServiceProxy ,
  FetchBenefitEligibilitiesServiceProxy ,
  AddEmployeeToBenefitBucketServiceProxy 
  
} from "../../../../_services/service-proxies";
import { FormGroup } from "@angular/forms";
import { AlertserviceService } from "app/_services/alertservice.service";
import {
  ACTIONS,
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";

enum TABLE_ACTION {
  VIEW = "1",
  DELETE = "2",
  EDIT = "3",
}


@Component({
  selector: "ngx-employee-view",
  templateUrl: "./employee-view.component.html",
  styleUrls: ["./employee-view.component.scss"],
})
export class EmployeeViewComponent implements OnInit {
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
  loading: boolean = true;
  showEmpty: boolean = false;
  Employee= new EmployeeDTO().clone()
  Adress: AddressDTO[] = [];
  contract: EmployeeContractAssignmentDTO[] = [];
  EmployeeHistories: EmployeeHistoryDTO[] = [];
  totalItems = 100;
  showModal = false;
  benefitSingle: BenefitPlanDTO;
  showBenenfit:boolean = false;
  submitbtnPressed:boolean = false;
  allEligibilities: IDTextViewModel[] = [];
  
  // AllVendors: VendorDTO[] = [];
  // plans: VendorPlanDTO[] = [];
  topActionButtons= [
  { name: "addEligibility", label: "Add Eigility", icon: "plus", outline: true },
  { name: "add", label: "Add Benefits", icon: "plus", outline: false }];

  columns: TableColumn[] = [
    { name: "name", title: "Coverage" },
    { name: "dateCreated", title: "Start" },
    { name: "endDate", title: "End Date" },
    // { name: "financialYear", title: "Effective Date" },
  ];

  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: "View" },
    { name: TABLE_ACTION.DELETE, label: "Delete" },
  ];

  constructor(
    private router: Router,
    private FetchAllBenefitsServiceProxy: FetchAllBenefitsServiceProxy,
    private Activated: ActivatedRoute,
    private FetchEmployeeByIdServiceProxy: FetchEmployeeByIdServiceProxy,
    private Route: Router,
    private FetchBenefitServiceProxy:FetchBenefitServiceProxy,
    private AddEmployeeToBenefitServiceProxy :AddEmployeeToBenefitServiceProxy ,
    private alertservice:AlertserviceService,
    private  FetchBenefitEligibilitiesServiceProxy :  FetchBenefitEligibilitiesServiceProxy ,
    private  AddEmployeeToBenefitBucketServiceProxy :  AddEmployeeToBenefitBucketServiceProxy 
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchBenefits();
    this.getAllEligibilities();
    this.Activated.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        return this.Route.navigate(["/benefits/manage-employee"]);
      }
      const employeid = paramMap.get("id");
      const ID = Number(employeid);
      this.employeeId = ID
      console.log("em", employeid);
      this.FetchEmployeeByIdServiceProxy.getEmployeeById(ID)
        .toPromise()
        .then((data) => {
          if (!data.hasError) {
            this.Employee = data.result;
            this.Adress = data.result.addresses;
            this.contract = data.result.contracts;
            this.EmployeeHistories = data.result.employmentHistories;
            console.log("contract", this.contract);
            console.log("employee", this.EmployeeHistories);
          } else {
            return data.message;
          }
        });
    });
  }
  benefitId: number 
  employeeId: number 
  bucketId:number
  showEligibility:boolean= false


  get disabled(){
    if(this.bucketId) return true
  }

 async  SubmitEvent(){
   this.submitbtnPressed= true
  
   const data =  await this.AddEmployeeToBenefitServiceProxy.addEmployeeToBenefit(this.benefitId,this.employeeId).toPromise();

   if (!data.hasError) {
    this.alertservice.openModalAlert(
      this.alertservice.ALERT_TYPES.SUCCESS,
      data.message,
      "OK"
    );
    this.showBenenfit = false;
    this.submitbtnPressed = false;
  } else {
    this.alertservice.openModalAlert(
      this.alertservice.ALERT_TYPES.FAILED,
      data.message,
      "OK"
    );
  }
   
  }

  get disable(){
    if(this.benefitId) return true;
    return false
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

  topActionClicked(event){
    if(event== 'add'){
      this.showBenenfit= true
    }
    if(event== 'addEligibility'){
      this.showEligibility= true
    }
  }
  selectedTab = 1;
  tabChanged(tab: number) {
    this.selectedTab = tab;
  }
  
  showAddModal() {
    this.showModal = true;
  }

  // async fetchBenefits() {
  //   this.loading = true;
  //   const data = await this.FetchAllBenefitsServiceProxy.fetchAllBenefits(
  //     this.vendorId,
  //     this.vendorPlanId,
  //     this.pageSize,
  //     this.pageNumber
  //   ).toPromise();
  //   if (!data.hasError) {
  //     this.allBenefito = data.result;
  //     console.log("beneitoto", this.allBenefito);
  //   }
  //   this.loading = false;
  // }

  
  tableActionClicked(event){
    if(event.name == TABLE_ACTION.VIEW){
    this.FetchBenefitServiceProxy.getBenefit(event.data.id).toPromise().then(data =>{
      if(!data.hasError){
        this.benefitSingle = data.result
        console.log('benefitsingle',this.benefitSingle)
      }
    })
    }

  }
  //submit Eligibiity 
 async  SubmitEligibility(){
    this.submitbtnPressed = true;
   const data = await  this.AddEmployeeToBenefitBucketServiceProxy.addEmployeeToBenefitBucket(this.bucketId,this.employeeId).toPromise();
   
   if (!data.hasError) {
    this.alertservice.openModalAlert(
      this.alertservice.ALERT_TYPES.SUCCESS,
      data.message,
      "OK"
    );
    this.showEligibility = false;
    this.submitbtnPressed = false;
  } else {
    this.alertservice.openModalAlert(
      this.alertservice.ALERT_TYPES.FAILED,
      data.message,
      "OK"
    );
  }
  }


  async getAllEligibilities() {
    const data =
      await this.FetchBenefitEligibilitiesServiceProxy.getBenefitEligibilities().toPromise();
    if (!data.hasError) {
      this.allEligibilities = data.result;
      console.log("i don tire ell", this.allEligibilities);
    }
  }


}
