import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { BaseComponent } from 'app/components/base/base.component';
import { KeyResultAreaService, MyKeyResultArea } from '../../services/key-result-area.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Router } from '@angular/router';


enum TOP_ACTIONS { ADD__KEY__RESULT__AREAS, };
enum ACTIONS {
  edit = '1', delete = '2', view_kpi = '3', assign = '4'
}


@Component({
  selector: 'ngx-key-result-area',
  templateUrl: './key-result-area.component.html',
  styleUrls: ['./key-result-area.component.scss']
})
export class KeyResultAreaComponent extends BaseComponent<MyKeyResultArea, MyKeyResultArea, MyKeyResultArea> {
  ChoiceName = ChoiceName;
  filter: MyKeyResultArea;
  data: MyKeyResultArea[];
  getData(): Observable<ListResult<MyKeyResultArea>> {
    return this.api.list({});
  }
  saveData(e: MyKeyResultArea): Observable<any> {
    return this.api.create(e);
  }
  getNewEditingData(): MyKeyResultArea {
    return new MyKeyResultArea();
  }
  successMessage: string;
  deleteData(data: MyKeyResultArea): Observable<any> {
    throw new Error('Method not implemented.');
  }
  topActionButtons = [
    { name: 'ADD__KEY__RESULT__AREAS', label: 'Add Key Result Areas', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  tableColumns = [
    { name: 'section_name', title: 'KRA' },
    { name: 'description', title: 'Description' },
    { name: 'date', title: 'Cycle' },
    { name: 'maximum_score_obtainable', title: 'Score' },
    { name: 'weight', title: 'Weight' },
    { name: 'no_of_kpis', title: 'No of KPIs' },
    { name: 'date', title: 'Strategy Category' }
  ];
  tableActions: TableAction[] = [
    {name: ACTIONS.view_kpi, label: 'View Kpi'},
    {name: ACTIONS.assign, label: 'Assign KRA'},
    {name: ACTIONS.edit, label: 'Edit'},
    {name: ACTIONS.delete, label: 'Delete'},
  ];
  tableActionClicked(event: TableActionEvent<MyKeyResultArea>) {
    if (event.name === ACTIONS.view_kpi) {
      this.router.navigateByUrl(`/performance/kra/${event.data.id}/kpi`);
    }
    if (event.name === ACTIONS.assign) {
      this.router.navigateByUrl(`/performance/kra/${event.data.id}/assign`);
    }
  }
  constructor(
    private api: KeyResultAreaService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private router: Router,
  ) {
    super(confirmBox);
  }
}
