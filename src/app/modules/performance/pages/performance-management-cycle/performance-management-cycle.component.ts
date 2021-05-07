// import { Component, OnInit } from '@angular/core';
// import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
// import { MainBaseComponent } from 'app/components/main-base/main-base.component';
// import { MyPerformanceCycle, PerformanceManagementService, Review_Types } from '../../services/performance-management.service';
// import { BaseComponent } from 'app/components/base/base.component';
// import { AlertserviceService } from 'app/_services/alertservice.service';
// import { ListResult } from 'app/_services/base-api.service';
// import { Observable } from 'rxjs';
// import { ConfirmBoxService } from 'app/_services/confirm-box.service';
// import { ChoiceName } from 'app/components/multi-select/multi-select.component';
// import { ISelectable } from 'app/components/radio-button/radio-button.component';


// enum TOP_ACTIONS { ADD__NEW__CYCLE, };

// enum RATING_TYPE_VALUES{
//   OPEN_ENDED = '1', CLOSED_ENDED = '2',
// }



// @Component({
//   selector: 'ngx-performance-management-cycle',
//   templateUrl: './performance-management-cycle.component.html',
//   styleUrls: ['./performance-management-cycle.component.scss']
// })
// export class PerformanceManagementCycleComponent extends BaseComponent<MyPerformanceCycle, MyPerformanceCycle, MyPerformanceCycle> {
//   reviewTypes = Review_Types;
//   ChoiceName = ChoiceName;
//   filter: MyPerformanceCycle = new MyPerformanceCycle();
//   data: MyPerformanceCycle[] = [];
//   getData(): Observable<ListResult<MyPerformanceCycle>> {
//     return this.api.list(this.filter);
//   }
//   saveData(e: MyPerformanceCycle): Observable<any> {
//     return this.api.create(e);
//   }
//   getNewEditingData(): MyPerformanceCycle {
//     return new MyPerformanceCycle();
//   }
//   successMessage: string;
//   deleteData(data: MyPerformanceCycle): Observable<any> {
//     throw new Error('Method not implemented.');
//   }
//   topActionButtons = [
//     { name: 'ADD__NEW__CYCLE', label: 'Add New Cycle', icon: 'plus', outline: false },
//   ];
//   TOP_ACTIONS = TOP_ACTIONS;
//   tableColumns = [
//     { name: 'name', title: 'Cycle Name' },
//     { name: 'startDate', title: 'Date (From)' },
//     { name: 'endDate', title: 'Date (TO)' },
//     { name: 'date', title: 'Period' },
//     { name: 'date', title: 'Time' },
//     { name: 'rating_type', title: 'Rating' },
//     { name: 'status', title: 'Status', type: ColumnTypes.Status },
//   ];

//   constructor(protected alertService: AlertserviceService,
//     protected confirmBox: ConfirmBoxService,
//     protected api: PerformanceManagementService) {
//     super(confirmBox);
//   }

//   reviewPurposes: any[] = [
//     {label: 'Confirmation', name: '1'},
//     {label: 'Promotion', name: '2'},
//     {label: 'Pay Review', name: '3'},
//     {label: 'General', name: '4'},
//   ];

//   appraisalTypes: ISelectable[] = [
//     {selectLabel: 'Self Appraisal', selectValue: '1'},
//     {selectLabel: '180 Appraisal', selectValue: '2'},
//     {selectLabel: '360 Appraisal', selectValue: '3'},
//   ];
//   RATING_TYPE_VALUES = RATING_TYPE_VALUES;
//   ratingTypes: ISelectable[] = [
//     {selectLabel: 'Open Ended', selectValue: RATING_TYPE_VALUES.OPEN_ENDED},
//     {selectLabel: 'Closed Ended', selectValue: RATING_TYPE_VALUES.CLOSED_ENDED},
//   ];
// }
