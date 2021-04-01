import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';


enum TOP_ACTIONS {ADD__KEY__RESULT__AREAS,};



@Component({
  selector: 'ngx-key-result-area',
  templateUrl: './key-result-area.component.html',
  styleUrls: ['./key-result-area.component.scss']
})
export class KeyResultAreaComponent extends MainBaseComponent {
  topActionButtons = [
 {name: 'ADD__KEY__RESULT__AREAS', label: 'Add Key Result Areas', icon: 'plus', outline: false},
]
TOP_ACTIONS = TOP_ACTIONS;
tableColumns = [
                {name: 'date', title: 'KRA'},
{name: 'date', title: 'Description'},
{name: 'date', title: 'Cycle'},
{name: 'date', title: 'Score'},
{name: 'date', title: 'Weight'},
{name: 'date', title: 'No of KPIs'},
{name: 'date', title: 'Strategy Category'}
            ]
}
