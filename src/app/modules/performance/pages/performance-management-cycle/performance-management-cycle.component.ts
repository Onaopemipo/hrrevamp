import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { MyPerformanceCycle, PerformanceManagementService, Review_Types } from '../../services/performance-management.service';
import { BaseComponent } from 'app/components/base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { Observable } from 'rxjs';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { ISelectable } from 'app/components/radio-button/radio-button.component';
import { CycleDTO } from 'app/_services/service-proxies';


enum TOP_ACTIONS { ADD__NEW__CYCLE, };

enum RATING_TYPE_VALUES{
  OPEN_ENDED = '1', CLOSED_ENDED = '2',
}



@Component({
  selector: 'ngx-performance-management-cycle',
  templateUrl: './performance-management-cycle.component.html',
  styleUrls: ['./performance-management-cycle.component.scss']
})
export class PerformanceManagementCycleComponent extends BaseComponent<MyPerformanceCycle, MyPerformanceCycle, MyPerformanceCycle> {
  applicableArea = 0;
  reviewTypes = Review_Types;
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
  successMessage: string = "Cycle saved successfully";
  deleteData(data: MyPerformanceCycle): Observable<any> {
    throw new Error('Method not implemented.');
  }
  get periodUnderReview() {
    if (!this.editingData) {
      return 0;
    }
    if (!this.editingData.startDate || !this.editingData.endDate) {
      return 0;
    }
    // const months = Math.ceil((this.editingData.endDate.getTime() - this.editingData.startDate.getTime()) / (30 * 24 * 60 * 60 * 1000))
    return (this.editingData.endDate.getFullYear() - this.editingData.startDate.getFullYear()) * 12 + (this.editingData.endDate.getMonth() - this.editingData.startDate.getMonth()) + 1
  }
  topActionButtons = [
    { name: 'ADD__NEW__CYCLE', label: 'Add New Cycle', icon: 'plus', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  tableColumns = [
    { name: 'name', title: 'Cycle Name' },
    { name: 'startDate', title: 'Date (From)', type: ColumnTypes.Date },
    { name: 'endDate', title: 'Date (TO)', type: ColumnTypes.Date },
    // { name: 'date', title: 'Period' },
    // { name: 'date', title: 'Time' },
    // { name: 'rating_type', title: 'Rating' },
    { name: 'status', title: 'Status', type: ColumnTypes.Status },
  ];

  constructor(protected alertService: AlertserviceService,
    protected confirmBox: ConfirmBoxService,
    protected api: PerformanceManagementService) {
    super(confirmBox);
  }

  tableActions: TableAction[] = [
    {name: 'edit', label: 'Edit'},
    // {name: 'delete', label: 'Delete'},
  ]

  tableActionClick(event: TableActionEvent<MyPerformanceCycle>) {
    if(event.name === 'edit') {
      this.editingData = new MyPerformanceCycle(new CycleDTO({...event.data}));
      this.showModal = true;
    } else {
      this.deleteData(event.data);
    }
  }

  reviewPurposes: any[] = [
    {label: 'Confirmation', name: '1'},
    {label: 'Promotion', name: '2'},
    {label: 'Pay Review', name: '3'},
    {label: 'General', name: '4'},
  ];

  appraisalTypes: ISelectable[] = [
    {selectLabel: 'Self Appraisal', selectValue: '1'},
    {selectLabel: '180 Appraisal', selectValue: '2'},
    {selectLabel: '360 Appraisal', selectValue: '3'},
  ];
  RATING_TYPE_VALUES = RATING_TYPE_VALUES;
  ratingTypes: ISelectable[] = [
    {selectLabel: 'Open Ended', selectValue: RATING_TYPE_VALUES.OPEN_ENDED},
    {selectLabel: 'Closed Ended', selectValue: RATING_TYPE_VALUES.CLOSED_ENDED},
  ];
}
