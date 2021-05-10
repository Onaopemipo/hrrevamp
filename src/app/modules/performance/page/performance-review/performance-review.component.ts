import { AlertserviceService } from './../../../../_services/alertservice.service';
import { KpiDTO, SavePerformanceReviewServiceProxy } from 'app/_services/service-proxies';
import { AuthenticationService } from './../../../../_services/authentication.service';
import { AuthService } from './../../../../_services/auth.service';
import { EmployeeCycleKrasServiceProxy, FetchKPIsServiceProxy, EmployeePerformanceReviewServiceProxy, KpiReviewDTO, GetEmployeePerformanceReviewServiceProxy, AssignedKPIs, SubmitEmployeeAppraisalReviewServiceProxy, SubmitPerformanceReviewServiceProxy, PerformanceReviewDTO, SaveEmployeeAppraisalReviewServiceProxy } from './../../../../_services/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  kra: KpiReviewDTO = new KpiReviewDTO();
  loading = true;
  isEmployeePage = true;
  tempEditingData: AssignedKPIs[] = [];
  employeeComment = "";

  cycle_id = 0;
  kra_id = 0;
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

  async loadKraInfo(){
    this.loading = true;
    this.kra =  (await this.employeePerformanceService.employeePerformanceReview(this.user.user.employee_contract_id, this.cycle_id, this.kra_id).toPromise()).result;
    this.tempEditingData = this.kra.assignedKPIs.map(kpi => kpi.clone())
    this.loading = false;
  }
  // async loadKpi(){
  //   this.kra =  (await this.performanceService.getEmployeePerformanceReview(this.user.user.employee_contract_id, this.cycle_id, this.kra_id).toPromise()).result
  // }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cycle_id = Number(params.get('cycle_id'));
      this.kra_id = Number(params.get('kra_id'));
      this.loadKraInfo();
    })
  }

  submit(){
    if(this.isEmployeePage){
      const performanceData = new PerformanceReviewDTO({
        ...this.kra,
        appraisalId: 0,
        employeeComment: this.employeeComment,
        reviewerComment: '',
        assignedKPIs: JSON.stringify(this.tempEditingData),
        hrComment: '',
      });
      this.saveEmployeePerformanceService.saveEmployeePerformanceReview(performanceData).subscribe(data => {
        this.alertService.openModalAlert(
          data.hasError || !data.result.isSuccessful ? this.alertService.ALERT_TYPES.FAILED : this.alertService.ALERT_TYPES.SUCCESS,
          data.message,
          'Okay'
        )
      });
    }
  }

}
