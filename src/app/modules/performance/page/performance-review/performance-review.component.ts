import { AlertserviceService } from './../../../../_services/alertservice.service';
import { GetHRAppraisalReviewsServiceProxy, KpiDTO, MessageOutApiResult, SavePerformanceReviewServiceProxy } from 'app/_services/service-proxies';
import { AuthenticationService } from './../../../../_services/authentication.service';
import { AuthService } from './../../../../_services/auth.service';
import { EmployeeCycleKrasServiceProxy,GetHREmployeePerformanceReviewServiceProxy, FetchKPIsServiceProxy, EmployeePerformanceReviewServiceProxy, KpiReviewDTO, GetEmployeePerformanceReviewServiceProxy, AssignedKPIs, SubmitEmployeeAppraisalReviewServiceProxy, SubmitPerformanceReviewServiceProxy, PerformanceReviewDTO, SaveEmployeeAppraisalReviewServiceProxy } from './../../../../_services/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum PerformanceEmployeeType{
  employee, reviewer, supervisor, hr
}
interface MyKpiReview {
  kpi: KpiDTO,
  review?: KpiReviewDTO
}
@Component({
  selector: 'ngx-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.scss']
})
export class PerformanceReviewComponent implements OnInit {
  kpis: MyKpiReview[]  = []
  kra = new KpiReviewDTO().clone();
  loading = true;
  get isEmployeePage() {
    return this.performanceEmployeeType == PerformanceEmployeeType.employee;
  }
  get isReviewerPage() {
    return this.performanceEmployeeType == PerformanceEmployeeType.reviewer;
  }
  tempEditingData: AssignedKPIs[] = [];
  employeeComment = "";
  @Input() last = false;
  @Input() performanceEmployeeType = 0;
  @Output() next = new EventEmitter();

  cycle_id = 0;
  kra_id = 0;
  kra_name = '';
  _kra = new KpiReviewDTO().clone();
  loadingSave = false;
  // get kra() {
  //   return this._kra;
  // }
  @Input() set current_kra(val: KpiReviewDTO) {
    if(!val || val.cycleId == 0 || !val.cycleId) return;
    this._kra = val;
    this.cycle_id = val.cycleId;
    this.kra_id = val.kraId;
    this.kra_name = val.kraName;
    this.loadKraInfo();
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private kra_api: EmployeeCycleKrasServiceProxy,
    private kpiService: FetchKPIsServiceProxy,
    private reviewePerformanceService: GetEmployeePerformanceReviewServiceProxy,
    private GetHRAppraisalReviewsService: GetHREmployeePerformanceReviewServiceProxy,
    private employeePerformanceService: EmployeePerformanceReviewServiceProxy,
    private submitEmployeePerformanceService: SubmitPerformanceReviewServiceProxy,
    private saveEmployeePerformanceService: SavePerformanceReviewServiceProxy,
    private saveEmployeeAppraisalService: SaveEmployeeAppraisalReviewServiceProxy,
    private submitReviewerPerformanceService: SubmitEmployeeAppraisalReviewServiceProxy,
    private user: AuthService,
    private user1: AuthenticationService,
    private alertService: AlertserviceService,
  ) { }

  delay(time: number) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {resolve(null)}, time)
    });
  }
  async loadKraInfo(){
    await this.delay(2000);
    console.log(1)
    console.log({a: this.performanceEmployeeType})
    this.loading = true;
    if (this.performanceEmployeeType == PerformanceEmployeeType.employee) {
      console.log(2)
      // this.user1.getuser().then(async user => {
        const user = await this.user1.getuser();
        let luser = user[0];
        this.kra =  (await this.employeePerformanceService.employeePerformanceReview(luser.employee_contract_id, this.cycle_id, this.kra_id).toPromise()).result;
        // this.loading = false;
        this.tempEditingData = this.kra.assignedKPIs.map(kpi => kpi.clone())
      // })
    } else if (this.performanceEmployeeType == PerformanceEmployeeType.reviewer) {
      console.log(3)
      this.kra =  (await this.reviewePerformanceService.getEmployeePerformanceReview(this._kra.employeeContractId, this.cycle_id, this.kra_id).toPromise()).result;
      // this.loading = false;
      this.tempEditingData = this.kra.assignedKPIs.map(kpi => kpi.clone())
    }
    else {
      console.log(this._kra)
      this.kra =  (await this.GetHRAppraisalReviewsService.getEmployeePerformanceReview(this._kra.employeeContractId, this.cycle_id, this.kra_id).toPromise()).result;
      // this.loading = false;
      this.tempEditingData = this.kra.assignedKPIs.map(kpi => kpi.clone())
    }
    this.loading = false;
  }
  // async loadKpi(){
  //   this.kra =  (await this.performanceService.getEmployeePerformanceReview(this.user.user.employee_contract_id, this.cycle_id, this.kra_id).toPromise()).result
  // }
  ngOnInit(): void {
    window.globalThis.yyy = this;
    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.cycle_id = Number(params.get('cycle_id'));
    //   this.kra_id = Number(params.get('kra_id'));
    //   this.kra_name = params.get('kra_name');
    //   this.loadKraInfo();
    // })
  }

  gotoNext(){
    this.next.emit();
  }

  getKpiScore(kpi: AssignedKPIs){
  }

  async save(){
    this.loadingSave = true;
    let res: MessageOutApiResult;
    if(this.isEmployeePage){
      const performanceData = new PerformanceReviewDTO({
        ...this.kra,
        appraisalId: 0,
        //employeeComment: this.kra.employeeComment,
        reviewerComment: '',
        assignedKPIs: JSON.stringify(this.tempEditingData.map(kpi => {
          if(kpi.isClosedEnded) return kpi;
          kpi.yesResponse = kpi.employeeScore == 1;
          kpi.fairResponse = kpi.employeeScore == 2;
          kpi.noResponse = kpi.employeeScore == 3;
          return kpi;
        })),
        hrComment: '',
      });
      res = await this.saveEmployeePerformanceService.saveEmployeePerformanceReview(performanceData).toPromise();
      this.loadingSave = false;
      //   if(!data.hasError && data.result.isSuccessful){
      //     this.next.emit();
      //   }
      //   this.alertService.openModalAlert(
      //     data.hasError || !data.result.isSuccessful ? this.alertService.ALERT_TYPES.FAILED : this.alertService.ALERT_TYPES.SUCCESS,
      //     data.message,
      //     'Okay'
      //   );
      // });
    }
    else if(this.isReviewerPage){
      const performanceData = new PerformanceReviewDTO({
        ...this.kra,
        appraisalId: 0,
        //employeeComment: this.kra.employeeComment,
        reviewerComment: this.kra.reviewComment,
        assignedKPIs: JSON.stringify(this.tempEditingData),
        hrComment: '',
      });
      res = await this.saveEmployeeAppraisalService.saveEmployeeAppraisalReview(performanceData).toPromise();
      this.loadingSave = false;
    }
    await this.alertService.showResponseMessage(res).toPromise();
    if(this.isEmployeePage) this.next.emit();
  }

  get userHasSubmitted() {
    return (this.isEmployeePage && this.kra.isEmployeeSubmitted) || (this.isReviewerPage && this.kra.isReviewerSubmitted)
  }
}
