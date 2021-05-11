import { map } from 'rxjs/operators';
import { TableAction } from './../../../../components/tablecomponent/models';
import { Observable } from 'rxjs';
import { ListResult } from 'app/_services/base-api.service';
import { TableActionEvent, ColumnTypes } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { KeyResultAreaService } from './../../services/key-result-area.service';
import { BaseComponent } from 'app/components/base/base.component';
import { SubordinateAppraisalsServiceProxy } from 'app/_services/service-proxies';
import { GetHRAppraisalReviewsServiceProxy, AppraisalReviewerListDTO, AppraisalReviewerListDTOIListApiResult } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-hr-review-list',
  templateUrl: './hr-review-list.component.html',
  styleUrls: ['./hr-review-list.component.scss']
})
export class HrReviewListComponent extends BaseComponent<any, any, any> {

  data = [];
  // ngOnInit(): void {
    // this.supervisorListService.subordinateAppraisalLists(0).subscribe();
    // this.hrListService.fetchHRAppraisalReviews(0, 10, 1).subscribe(data => {
    //   this.data = data.result;
    // })
  // }
  is_hr_page = true;
  filter: {};
  mapToApiListResult(data: AppraisalReviewerListDTOIListApiResult){
    const res: ListResult<AppraisalReviewerListDTO> = {
      data: data.result,
      length: 10,
    };
    return {
      data: data.result,
      length: data.totalRecord,
    }
  }
  getData(): Observable<ListResult<any>> {
    if(this.is_hr_page) return this.hrListService.fetchHRAppraisalReviews(0, 10, 1).pipe(map(e => this.mapToApiListResult(e)));
    return this.supervisorListService.subordinateAppraisalLists(0).pipe(map(e => this.mapToApiListResult(e)));
  }
  saveData(e: any): Observable<any> {
    return this.api.create(e);
  }
  getNewEditingData(): any {
    return {};
  }
  successMessage: string;
  deleteData(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  topActionButtons = [];
  tableColumns = [
    { name: 'section_name', title: 'KRA' },
    { name: 'maximum_score_obtainable', title: 'Score' },
    { name: 'weight', title: 'Weight' },
    { name: 'ratingType', title: 'Rating Type' },
    { name: 'no_of_kpis', title: 'No of KPIs' },
  ];

  tableActionClicked(event: TableActionEvent<AppraisalReviewerListDTO>) {
    this.router.navigateByUrl(`/performance/kra/${event.data.periodId}/assign`);
  }
  constructor(
    private api: KeyResultAreaService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hrListService: GetHRAppraisalReviewsServiceProxy,
    private supervisorListService: SubordinateAppraisalsServiceProxy,
  ) {
    super(confirmBox);
  }

  ngOnInit(){
    this.activatedRoute.url.subscribe(url => {
      this.is_hr_page = Boolean(url.find(seg => seg.toString().includes('hr')));
      super.ngOnInit();
    })
  }
}
