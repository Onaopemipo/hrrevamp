import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IStatus, MyColor } from './../../../../components/status/models';
import { TableActionEvent } from './../../../../components/tablecomponent/models';
import { EmployeeCycleKrasServiceProxy, KraReviewerDTO, KpiReviewDTO, AppraisalReviewerListDTOIListApiResult, KpiReviewDTOIListApiResult } from './../../../../_services/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { PerformanceEmployeeType } from '../../page/performance-review/performance-review.component';

class MyEmployeeKra extends KpiReviewDTO{

  // getStatusLabel() {
  //   if (!this.isEmployeeSubmitted) return 'Drafted';
  //   if (this.isEmployeeSubmitted && !this.isReviewerSubmitted) return 'Employee Done';
  //   if (this.isEmployeeSubmitted && this.isReviewerSubmitted) return 'Reviewer Done';
  // }

  getStatusColor() {
      // if (this.iObj.status_id === 1) return new MyColor(242, 153, 74);
      // if (this.iObj.status_id === 2) return new MyColor(0, 153, 74);
      // if (this.iObj.status_id === 3) return new MyColor(242, 0, 74);
      // return new MyColor(242, 0, 74);
  }
}
@Component({
  selector: 'ngx-my-appraisal-cycle',
  templateUrl: './my-appraisal-cycle.component.html',
  styleUrls: ['./my-appraisal-cycle.component.scss']
})
export class MyAppraisalCycleComponent implements OnInit {


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: EmployeeCycleKrasServiceProxy,
    private http: HttpClient,
  ) { }

  kras: MyEmployeeKra[] = []

  cycle_id = 0;
  pageType = PerformanceEmployeeType.employee
  employee_id = 0;
  loadEmployeecycleData(cycleId: number, employeeContractId: number){
    return this.http.get<KpiReviewDTOIListApiResult>(`https://hrv2-api.azurewebsites.net/api/Appraisal/FetchEmployeeCycleKrasByEmployeeID/FetchEmployeeCycleKrasByEmployeeID?cycleId=${cycleId}&employeeContractId=${employeeContractId}`)
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      const employeeId = params.get('employee_id');
      this.cycle_id = id;
      this.loading = true;
      if(!employeeId){
        this.kras = (await this.api.fetchEmployeeCycleKras(id, 1000, 1).toPromise()).result.map(kra => new MyEmployeeKra(kra));
      } else {
        this.activatedRoute.url.subscribe(async(url) => {
          const isSupervisor = url.find(f => f.toString() == 'supervisor');
          if(isSupervisor){
            this.pageType = PerformanceEmployeeType.supervisor;
          } else {
            this.pageType = PerformanceEmployeeType.hr;
          }
          this.employee_id = Number(employeeId)
          this.kras = (await this.loadEmployeecycleData(this.cycle_id, this.employee_id).toPromise()).result.map(kra => new MyEmployeeKra(kra));
        })
      }
      this.loading = false;
    })
  }


  tableColumns: TableColumn[] = [
    {name: 'kraName', title: 'Name', type: ColumnTypes.Text},
    {name: 'dueDate', title: 'Due Date', type: ColumnTypes.Date},
    {name: 'isEmployeeSubmitted', title: 'Employee Reviewed', type: ColumnTypes.Mark},
    {name: 'isReviewerSubmitted', title: 'Reviewer Reviewed', type: ColumnTypes.Mark},
    // {name: 'assignedKr', title: '', type: ColumnTypes.Link, link_name: 'View KPIs'},
  ]

  get showEmpty(){
    return this.kras.length === 0;
  }
  loading = false;

  itemClicked(event: TableActionEvent<KpiReviewDTO>){
    this.router.navigateByUrl(`/performance/cycle/${event.data.cycleId}/kra/${event.data.kraId}/my-review`)
  }
  gotoReview() {
    if(this.pageType === PerformanceEmployeeType.employee)
      this.router.navigateByUrl(`/performance/my-appraisals/cycle/${this.cycle_id}/review`);
    if(this.pageType === PerformanceEmployeeType.supervisor)
      this.router.navigateByUrl(`/performance/supervisor/cycle/${this.cycle_id}/employee/${this.employee_id}/review`);
    if(this.pageType === PerformanceEmployeeType.hr)
      this.router.navigateByUrl(`/performance/hr/cycle/${this.cycle_id}/employee/${this.employee_id}/review`);
  }

}
