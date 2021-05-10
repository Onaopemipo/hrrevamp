import { ColumnTypes, TableActionEvent } from './../../../../components/tablecomponent/models';
import { GetEmployeeAppraisalHistoriesServiceProxy, EmployeeAppraisalHistoryDTO } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'app/components/tablecomponent/models';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-my-appraisals',
  templateUrl: './my-appraisals.component.html',
  styleUrls: ['./my-appraisals.component.scss']
})
export class MyAppraisalsComponent implements OnInit {

  tableColumns: TableColumn[] = [
    {name: 'appraisalType', title: 'Appraisal Type'},
    {name: 'assignedKra', title: 'No of KRAS'},
    {name: 'assignedKr', title: '', type: ColumnTypes.Link, link_name: 'View KRAs'},
  ]
  appraisals: EmployeeAppraisalHistoryDTO[] = []
  constructor(
    private api: GetEmployeeAppraisalHistoriesServiceProxy,
    private router: Router,
  ) { }

  async loadData(pageNo) {
    this.loading = true;
    const res = (await this.api.employeeAppraisalHistories(0, 10, pageNo).toPromise())
    this.appraisals = res.result;
    this.loading = false;
  }
  async ngOnInit() {
    this.loadData(1);
  }

  loadNewPage(pageNo){
    this.loadData(pageNo);
  }

  get showEmpty(){
    return this.appraisals.length === 0;
  }
  loading = false;

  itemClicked(appraisal: TableActionEvent<EmployeeAppraisalHistoryDTO>){
    const link = `/performance/my-appraisals/cycle/${appraisal.data.cycleId}`;
    console.log(link);
    this.router.navigateByUrl(link)
  }

}
