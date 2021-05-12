import { AppraisalReviewerListDTO, AppraisalReviewerListDTOIListApiResult, KpiReviewDTO, KpiReviewDTOIListApiResult } from './../../../../_services/service-proxies';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn, TableActionEvent } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { AppraisalService } from '../../services/appraisal.service';
import { Router } from '@angular/router';


enum TABS { PENDING, REVIEWED, };
enum TOP_ACTIONS { };



@Component({
  selector: 'ngx-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.scss']
})
export class AppraisalComponent extends MainBaseComponent {
  topActionButtons = [
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  TABS = TABS;
  selectedTab = TABS.PENDING;
  tableColumns: TableColumn[] = [
    { name: 'employeeName', title: 'Name' },
    // { name: 'date', title: 'ID' },
    { name: 'department', title: 'Department' },
    { name: 'cycleName', title: 'Cycle' },
    { name: 'kraName', title: 'Assigned KRA' },
    { name: 'isEmployeeSubmitted', title: 'Employee Status', type: ColumnTypes.Mark },
    { name: 'isReviewerSubmitted', title: 'Reviewer Status', type: ColumnTypes.Mark },
    { name: 'link', title: '', type: ColumnTypes.Link, link_name: 'View'},
  ];

  constructor(
    private api: AppraisalService,
    private router: Router,
    private http: HttpClient,
  ) {
    super();
  }

  getKras(){
    return this.http.get<KpiReviewDTOIListApiResult>('https://hrv2-api.azurewebsites.net/api/Appraisal/FecthReviewerKras/FecthReviewerKras')
  }

  async ngOnInit() {
    this.loading = true;
    const res = await this.getKras().toPromise(); //this.api.list({cycleId: 0}).toPromise();
    this.data = res.result;
    this.loading = false;
  }

  tableActionClick(data: TableActionEvent<KpiReviewDTO>){
    this.router.navigateByUrl(`/performance/reviewer/cycle/${data.data.cycleId}/kra/${data.data.kraId}/${data.data.kraName}/employee/${data.data.employeeId}/review`)
  }
}
