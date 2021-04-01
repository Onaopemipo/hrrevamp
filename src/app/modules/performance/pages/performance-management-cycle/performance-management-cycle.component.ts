import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { MyPerformanceCycle, PerformanceManagementService } from '../../services/performance-management.service';
import { BaseComponent } from 'app/components/base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';


enum TOP_ACTIONS { ADD__NEW__CYCLE, };



@Component({
  selector: 'ngx-performance-management-cycle',
  templateUrl: './performance-management-cycle.component.html',
  styleUrls: ['./performance-management-cycle.component.scss']
})
export class PerformanceManagementCycleComponent extends BaseComponent<MyPerformanceCycle, MyPerformanceCycle, MyPerformanceCycle> {
  ChoiceName = ChoiceName;
  filter: MyPerformanceCycle = new MyPerformanceCycle();
  data: MyPerformanceCycle[] = [];
  getData(): Observable<ListResult<MyPerformanceCycle>> {
    return this.api.list(this.filter);
  }
  saveData(e: MyPerformanceCycle): Observable<any> {
    return this.api.create(e);
  }
  getNewEditingData(): MyPerformanceCycle {
    return new MyPerformanceCycle();
  }
  successMessage: string;
  deleteData(data: MyPerformanceCycle): Observable<any> {
    throw new Error('Method not implemented.');
  }
  topActionButtons = [
    { name: 'ADD__NEW__CYCLE', label: 'Add New Cycle', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  tableColumns = [
    { name: 'date', title: 'Cycle Name' },
    { name: 'date', title: 'Date (From)' },
    { name: 'date', title: 'Date (TO)' },
    { name: 'date', title: 'Period' },
    { name: 'date', title: 'Time' },
    { name: 'date', title: 'Rating' },
    { name: 'date', title: 'Status' }
  ];

  constructor(protected alertService: AlertserviceService,
    protected confirmBox: ConfirmBoxService,
    protected api: PerformanceManagementService) {
    super(confirmBox);
  }
}
