import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TOP_ACTIONS { };



@Component({
  selector: 'ngx-performance-reviews',
  templateUrl: './performance-reviews.component.html',
  styleUrls: ['./performance-reviews.component.scss']
})
export class PerformanceReviewsComponent extends MainBaseComponent {
  topActionButtons = [
  ]
  TOP_ACTIONS = TOP_ACTIONS
  tableColumns = [
    { name: 'date', title: 'Performance Period' },
    { name: 'date', title: 'Appraisal Type' },
    { name: 'date', title: 'Score' },
    { name: 'date', title: 'Grade' },
    { name: 'date', title: 'Recommendation' }
  ]
}
