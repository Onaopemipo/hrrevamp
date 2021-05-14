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
} from "../../../_services/service-proxies";
import { FormGroup } from "@angular/forms";
import { AlertserviceService } from "app/_services/alertservice.service";

@Component({
  selector: "ngx-add-benefit",
  templateUrl: "./add-benefit.component.html",
  styleUrls: ["./add-benefit.component.scss"],
})
export class AddBenefitComponent implements OnInit {
  AllVendors: VendorDTO[];
  AllEmployee: EmployeeDTO[];
  searchText?: string = "a";
  pageSize?: number = 1000;
  pageNum?: number = 1;
  contractStatus?: number = 1;
  constructor(
    private GetAllVendorServiceProxy: GetAllVendorServiceProxy,
    private FetchAllEmployeesServiceProxy: FetchAllEmployeesServiceProxy
  ) {}

  ngOnInit(): void {
    this.getAllVendor();
    this.getAllEmployee();
  }

  async getAllVendor() {
    const data = await this.GetAllVendorServiceProxy.getAllVendor().toPromise();
    if (!data.hasError) {
      this.AllVendors = data.result;
      console.log(
        "i want see wetin i keep for that vendora variable",
        this.AllVendors
      );
    }
  }

  id;
  // fetch all Employee
  async getAllEmployee() {
    const data = await this.FetchAllEmployeesServiceProxy.getAllEmployees(
      this.searchText,
      this.contractStatus,
      this.pageSize,
      this.pageNum
    ).toPromise();
    if (!data.hasError) {
      this.AllEmployee = data.result;

      this.id = data.result.map((employee) => JSON.stringify(employee.id));
      console.log("id", this.id);
    }

    console.log(
      "i want see wetin i keep for that vendora variable",
      this.AllEmployee,
      this.id
    );
  }


  employeesSelected(employees: EmployeeDTO[]){
    // this.employees = employees.map(employee => employee.employeeContractId)
  }
}
