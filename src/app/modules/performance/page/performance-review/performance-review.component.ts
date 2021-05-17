import { AlertserviceService } from './../../../../_services/alertservice.service';
import { KpiDTO, MessageOutApiResult, SavePerformanceReviewServiceProxy } from 'app/_services/service-proxies';
import { AuthenticationService } from './../../../../_services/authentication.service';
import { AuthService } from './../../../../_services/auth.service';
import { EmployeeCycleKrasServiceProxy, FetchKPIsServiceProxy, EmployeePerformanceReviewServiceProxy, KpiReviewDTO, GetEmployeePerformanceReviewServiceProxy, AssignedKPIs, SubmitEmployeeAppraisalReviewServiceProxy, SubmitPerformanceReviewServiceProxy, PerformanceReviewDTO, SaveEmployeeAppraisalReviewServiceProxy } from './../../../../_services/service-proxies';
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
  kra: KpiReviewDTO = new KpiReviewDTO().clone();
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
    if(!val) return;
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
    await this.delay(500);
    this.loading = true;
    if (this.performanceEmployeeType == PerformanceEmployeeType.employee) {

      this.user1.getuser().then(async user => {
        let luser = user[0];
        this.kra =  (await this.employeePerformanceService.employeePerformanceReview(luser.employee_contract_id, this.cycle_id, this.kra_id).toPromise()).result;
        this.tempEditingData = this.kra.assignedKPIs.map(kpi => kpi.clone())
      })
     
    } else {
      this.kra =  (await this.reviewePerformanceService.getEmployeePerformanceReview(this._kra.employeeContractId, this.cycle_id, this.kra_id).toPromise()).result;
      this.tempEditingData = this.kra.assignedKPIs.map(kpi => kpi.clone())
    }
    this.loading = false;
  }
  // async loadKpi(){
  //   this.kra =  (await this.performanceService.getEmployeePerformanceReview(this.user.user.employee_contract_id, this.cycle_id, this.kra_id).toPromise()).result
  // }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cycle_id = Number(params.get('cycle_id'));
      this.kra_id = Number(params.get('kra_id'));
      this.kra_name = params.get('kra_name');
      this.loadKraInfo();
    })
  }

  gotoNext(){
    this.next.emit();
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
        assignedKPIs: JSON.stringify(this.tempEditingData),
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
