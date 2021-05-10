import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { AppraisalService } from '../../services/appraisal.service';


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
  tableColumns = [
    { name: 'date', title: 'Name' },
    { name: 'date', title: 'ID' },
    { name: 'date', title: 'Department' },
    { name: 'date', title: 'Cycle' },
    { name: 'date', title: 'Assigned KRA' },
    { name: 'date', title: 'Employee Status' },
    { name: 'date', title: 'Reviewer Status' }
  ];

  constructor(
    private api: AppraisalService,
  ) {
    super();
  }

  async ngOnInit() {
    this.loading = true;
    alert(8)
    const res = await this.api.list({cycleId: 1}).toPromise();
    this.data = res.data;
    this.loading = false;
    // this.activatedRoute.paramMap.subscribe(async (data) => {
      // this.kra = await this.KraService.fetch(Number(data.get('id'))).toPromise();
    // });
  }
}
