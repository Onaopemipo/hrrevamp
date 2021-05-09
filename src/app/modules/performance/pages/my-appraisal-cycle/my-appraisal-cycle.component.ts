import { IStatus, MyColor } from './../../../../components/status/models';
import { TableActionEvent } from './../../../../components/tablecomponent/models';
import { EmployeeCycleKrasServiceProxy, KraReviewerDTO, KpiReviewDTO } from './../../../../_services/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';

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
  ) { }

  kras: MyEmployeeKra[] = []

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      this.loading = true;
      this.kras = (await this.api.fetchEmployeeCycleKras(id, 1000, 1).toPromise()).result.map(kra => new MyEmployeeKra(kra));
      this.loading = false;
    })
  }


  tableColumns: TableColumn[] = [
    {name: 'kraName', title: 'Name', type: ColumnTypes.Text},
    {name: 'dueDate', title: 'Due Date', type: ColumnTypes.Date},
    {name: 'isEmployeeSubmitted', title: 'Employee Reviewed', type: ColumnTypes.Mark},
    {name: 'isReviewerSubmitted', title: 'Reviewer Reviewed', type: ColumnTypes.Mark},
    {name: 'assignedKr', title: '', type: ColumnTypes.Link, link_name: 'View KPIs'},
  ]

  get showEmpty(){
    return this.kras.length === 0;
  }
  loading = false;

  itemClicked(event: TableActionEvent<KpiReviewDTO>){
    this.router.navigateByUrl(`/performance/cycle/${event.data.cycleId}/kra/${event.data.kraId}/my-review`)
  }

}
