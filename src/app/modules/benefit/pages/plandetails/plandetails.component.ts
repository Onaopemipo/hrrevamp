import { Component, OnInit } from '@angular/core';
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
  GetVendorPlanByIdServiceProxy,
  VendorPlanDTO
} from "../../../../_services/service-proxies";
import { AlertserviceService} from "app/_services/alertservice.service";
import {
  ColumnTypes,
  TableAction,
  TableActionEvent,
} from "app/components/tablecomponent/models";
import { FormGroup } from "@angular/forms";

import { ThrowStmt } from "@angular/compiler";
import { Router, ActivatedRoute } from "@angular/router";


enum TABLE_ACTION {
  VIEW = "1",
  DELETE = "2",
  EDIT = "3",
}

@Component({
  selector: 'ngx-plandetails',
  templateUrl: './plandetails.component.html',
  styleUrls: ['./plandetails.component.scss']
})
export class PlandetailsComponent implements OnInit {

  plan = new VendorPlanDTO().clone()
  loading:boolean = true
  constructor(private activatedRoute:ActivatedRoute,private route : Router, private GetVendorPlanByIdServiceProxy:GetVendorPlanByIdServiceProxy) { }

  
  tableActions: TableAction[] = [
    { name: TABLE_ACTION.VIEW, label: "View" },
    // { name: TABLE_ACTION.EDIT, label: "UpdateList" },
    { name: TABLE_ACTION.DELETE, label: "Delete" },
  ];
  ngOnInit(): void {
    this.loading = true
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        //if the urlparams does not have that id i wasnt to just redirect or navigate to the home page
        return this.route.navigate(["/BenefitsVendor"]);
      }
      const vendorId = paramMap.get("id");
      const vend = Number(vendorId);
      this.loading = true
      this.GetVendorPlanByIdServiceProxy.getVendorPlan(vend).toPromise().then(data => {
        if(!data.hasError){
          this.plan= data.result
          this.loading = false
          console.log('data',this.plan)
        }
      })
      
    });
    
  }

  get showEmpty(){
    return this.plan.id ? true : false
  }
}
