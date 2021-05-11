import { AppraisalReviewerListDTO, AppraisalReviewerListDTOIListApiResult } from './../../../../_services/service-proxies';
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
    { name: 'fullName', title: 'Name' },
    // { name: 'date', title: 'ID' },
    { name: 'departmentId', title: 'Department' },
    { name: 'period', title: 'Cycle' },
    { name: 'assignedKra', title: 'Assigned KRA' },
    { name: 'date', title: 'Employee Status' },
    { name: 'date', title: 'Reviewer Status' },
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
    return this.http.get<AppraisalReviewerListDTOIListApiResult>('https://hrv2-api.azurewebsites.net/api/Appraisal/FecthReviewerKras/FecthReviewerKras')
  }

  async ngOnInit() {
    this.loading = true;
    const res = await this.getKras().toPromise(); //this.api.list({cycleId: 0}).toPromise();
    this.data = res.result;
    this.loading = false;
    // this.getKras().toPromise()
    // this.activatedRoute.paramMap.subscribe(async (data) => {
      // this.kra = await this.KraService.fetch(Number(data.get('id'))).toPromise();
    // });
  }

  tableActionClick(data: TableActionEvent<AppraisalReviewerListDTO>){
    this.router.navigateByUrl(`/performance/reviewer/cycle/${data.data.periodId}/kra/${data.data.assignedKra}/employee/${data.data.employeeId}/review`)
  }
}
