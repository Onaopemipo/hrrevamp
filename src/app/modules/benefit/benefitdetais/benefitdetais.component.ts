import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { id } from "@swimlane/ngx-charts";
import { TableColumn } from "app/components/tablecomponent/models";
import { Route } from "@angular/compiler/src/core";

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
} from "../../../_services/service-proxies";

import { FormGroup } from "@angular/forms";
import { AlertserviceService } from "app/_services/alertservice.service";
import {
  ACTIONS,
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";
@Component({
  selector: "ngx-benefitdetais",
  templateUrl: "./benefitdetais.component.html",
  styleUrls: ["./benefitdetais.component.scss"],
})
export class BenefitdetaisComponent implements OnInit {
  benefitSingle: BenefitPlanDTO;
  loading:boolean = true
  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private FetchBenefitServiceProxy: FetchBenefitServiceProxy
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        return this.router.navigate(["/benefits/manage-employee"]);
      }
      const employeid = paramMap.get("id");
      const ID = Number(employeid);
      console.log("em", employeid);
      
      this.FetchBenefitServiceProxy.getBenefit(ID)
        .toPromise()
        .then((data) => {
          if (!data.hasError) {
            this.benefitSingle = data.result
            console.log('singlebenene',this.benefitSingle)
          } else {
            return data.message;
          }
        });
    });
  }

  back(){
    this.router.navigate(['/benefits'])
  }
}
