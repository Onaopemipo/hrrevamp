import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AddUpdateBenefitEligibilityServiceProxy,
  DeleteBenefitEligibilityServiceProxy,
  ManageBenefitEligibilityDTO,
  FetchAllEligibilitiesServiceProxy,
  BenefitEligibilityDTO,
  FetchBenefitEligibilityServiceProxy,
} from "../../../_services/service-proxies";
import { AlertserviceService } from "app/_services/alertservice.service";
import { Transfer } from "@flowjs/ngx-flow";

@Component({
  selector: "ngx-eligibilityview",
  templateUrl: "./eligibilityview.component.html",
  styleUrls: ["./eligibilityview.component.scss"],
})
export class EligibilityviewComponent implements OnInit {
  eligibility: BenefitEligibilityDTO;
  Editing: boolean = false;
  showModal : boolean = false;
  submitbtnPressed:boolean= false
  Eli= new ManageBenefitEligibilityDTO().clone();
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private route: Router,
    private FetchBenefitEligibilityServiceProxy: FetchBenefitEligibilityServiceProxy,
    private AddUpdateBenefitEligibilityServiceProxy:AddUpdateBenefitEligibilityServiceProxy,
    private alertservice: AlertserviceService,
    private router: Router
  ) {}
  eligibilityID: number = 0;
  topActionButtons = [
    {
      name: "add_leave_year",
      label: "Edit",
      icon: "plus",
      outline: true,
    },
  ];

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((paraMap) => {
      if (!paraMap.has("id")) {
        //if the urlparams does not have that id i wasnt to just redirect or navigate to the home page
        return this.route.navigate(["/benefits/eligibility"]);
      }
      const elegibilityId = paraMap.get("id");
      this.eligibilityID = Number(elegibilityId);
      console.log("eligibilID", this.eligibilityID);
      this.getEligibility();
    });
  }
  async getEligibility() {
    const data =
      await this.FetchBenefitEligibilityServiceProxy.getBenefitEligibility(
        this.eligibilityID
      ).toPromise();
    if (!data.hasError) {
      this.eligibility = data.result;
      this.Eli =new ManageBenefitEligibilityDTO({ ...this.eligibility.clone(), employees: '', benefitTypeId: 0,positionId:0});
      console.log("elo", this.eligibility);
    }
  }
   

  //edit eligilibilty
  modal(event) {
    if (event == "add_leave_year") {
      this.Editing = true;
      this.showModal= true

    }
  }

  getSelectedEmployee(event, selectType) {
    if (selectType == "employee") {
      event.forEach((eve) => {
        var id = eve.id;
        var idString = id.toString();
        this.Eli.employees = idString;
      });

      console.log("benben", this.Eli.employees);
    }
  }
  //validation for editing
  get disability() {
    if (this.Eli.name ) return true;
    return false;
  }
    //Add benefitEligibility
    async Submit() {
      this.submitbtnPressed = true;
      const data =
        await this.AddUpdateBenefitEligibilityServiceProxy.addUpdateBenefitEligibility(
          this.Eli
        ).toPromise();
      if (!data.hasError) {
        this.alertservice
          .openModalAlert(
            this.alertservice.ALERT_TYPES.SUCCESS,
            data.message,
            "OK"
          )
          .subscribe((datares) => {
            if (datares) {
              this.router.navigateByUrl("/benefits/eligibility");
            }
          });
        this.showModal = false;
        this.submitbtnPressed = false;
      } else {
        this.alertservice.openModalAlert(
          this.alertservice.ALERT_TYPES.FAILED,
          data.message,
          "OK"
        );
      }
    }
}
