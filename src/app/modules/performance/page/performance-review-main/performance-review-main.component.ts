import { AlertserviceService } from './../../../../_services/alertservice.service';
import { Observable } from 'rxjs';
import { IDTextViewModel, MessageOutApiResult } from 'app/_services/service-proxies';
import { HttpClient } from '@angular/common/http';
import { PerformanceEmployeeType } from './../performance-review/performance-review.component';
import { AuthService } from './../../../../_services/auth.service';
import { EmployeeCycleKrasServiceProxy, KpiReviewDTO, SubmitPerformanceReviewServiceProxy, SubmitPerformanceReviewDTO, KpiReviewDTOIListApiResult, SubmitEmployeeAppraisalReviewServiceProxy, ReviewRecommendationsServiceProxy, SubmitHRAppraisalReviewServiceProxy } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-performance-review-main',
  templateUrl: './performance-review-main.component.html',
  styleUrls: ['./performance-review-main.component.scss']
})
export class PerformanceReviewMainComponent implements OnInit {

  loadingSave = false;
  selectedKra?: KpiReviewDTO;
  kras: KpiReviewDTO[] = [];
  loading = false;
  id = 0;
  selected_kra_index = 0;
  pageType = PerformanceEmployeeType.employee
  employee_id = 0;
  recommendation = '';
  hrComment = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private user: AuthService,
    private submitEmployeePerformanceService: SubmitPerformanceReviewServiceProxy,
    private submitSupervisorPerformanceService: SubmitEmployeeAppraisalReviewServiceProxy,
    private api: EmployeeCycleKrasServiceProxy,
    private http: HttpClient,
    private reviewRecommendation: ReviewRecommendationsServiceProxy,
    private submitHrReview: SubmitHRAppraisalReviewServiceProxy,
    private alertService: AlertserviceService,
  ) { }

  loadEmployeecycleData(cycleId: number, employeeContractId: number) {
    return this.http.get<KpiReviewDTOIListApiResult>(`https://hrv2-api.azurewebsites.net/api/Appraisal/FetchEmployeeCycleKrasByEmployeeID/FetchEmployeeCycleKrasByEmployeeID?cycleId=${cycleId}&employeeContractId=${employeeContractId}`)
  }

  get isSupervisor() {
    return this.pageType === PerformanceEmployeeType.supervisor;
  }
  get employeeCanEdit() {
    return this.pageType === PerformanceEmployeeType.employee && !this.selectedKra.isEmployeeSubmitted
  }

  get supervisorCanEdit() {
    return this.pageType === PerformanceEmployeeType.supervisor
  }
  recommendations: IDTextViewModel[] = [];
  async loadRecommendations() {
    this.recommendations = (await this.reviewRecommendation.reviewRecommendations().toPromise()).result;
  }

  ngOnInit(): void {
    this.loadRecommendations();
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      this.id = id;
      const employee_id = params.get('employee_id');
      this.loading = true;
      if (!employee_id) {
        this.kras = (await this.api.fetchEmployeeCycleKras(id, 1000, 1).toPromise()).result;
      } else {
        this.employee_id = Number(employee_id);
        this.activatedRoute.url.subscribe(async (url) => {
          const isSupervisor = url.find(f => f.toString() == 'supervisor');
          if (isSupervisor) {
            this.pageType = PerformanceEmployeeType.supervisor;
          } else {
            this.pageType = PerformanceEmployeeType.hr;
          }
        });
        this.kras = (await this.loadEmployeecycleData(this.id, this.employee_id).toPromise()).result;
      }
      this.selectedKra = this.kras.length > 0 ? this.kras[0] : null;
      this.selected_kra_index = 0;
      this.loading = false;
    })
  }

  get current_kra_is_last() {
    return this.selected_kra_index === this.kras.length;
  }

  gotoNext() {
    this.selected_kra_index += 1;
    const selectedKra = this.kras[this.selected_kra_index];
    if (selectedKra) this.selectedKra = selectedKra;
    else this.selectedKra = new KpiReviewDTO();
  }

  get employeeName() {
    return this.user.user.full_name;
  }

  get employeeDepartment() {
    return this.user.user.department;
  }

  get kra() {
    return this.selectedKra ? this.selectedKra : new KpiReviewDTO();
  }
  employeeComment = '';
  supervisorComment = '';
  async submit() {
    this.loadingSave = true;
    let res: MessageOutApiResult;
    if (this.pageType === PerformanceEmployeeType.employee) {
      const body = new SubmitPerformanceReviewDTO({
        appraisalId: 0,
        employeeContractId: 0,
        reviewerContractId: this.kras[0].reviewerContractId,
        cycleId: this.id,
        employeeComment: this.employeeComment,
        reviewerComment: '',
        hrComment: '',
        recommendations: '1',
      })
      res = await this.submitEmployeePerformanceService.submitEmployeePerformanceReview(body).toPromise();
    } else if (this.isSupervisor) {
      const body = new SubmitPerformanceReviewDTO({
        appraisalId: 0,
        employeeContractId: this.employee_id,
        reviewerContractId: this.kras[0].reviewerContractId,
        cycleId: this.id,
        employeeComment: this.employeeComment,
        reviewerComment: this.supervisorComment,
        hrComment: '',
        recommendations: '1',
      })
      res = await this.submitSupervisorPerformanceService.submitEmployeeAppraisalReview(body).toPromise();
    } else if (this.pageType === PerformanceEmployeeType.hr) {
      const body = new SubmitPerformanceReviewDTO({
        appraisalId: 0,
        employeeContractId: this.employee_id,
        reviewerContractId: this.kras[0].reviewerContractId,
        cycleId: this.id,
        employeeComment: this.employeeComment,
        reviewerComment: this.supervisorComment,
        hrComment: this.hrComment,
        recommendations: this.recommendation,
      })
      res = await this.submitHrReview.submitHRAppraisalReview(body).toPromise();
    }
    this.loadingSave = false;
    await this.alertService.showResponseMessage(res).toPromise();
  }

  // get employeeLocation() {
  //   // return this.user.user.;
  // }
}
