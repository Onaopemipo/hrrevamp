import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';


@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  tableColumns: TableColumn[] = [
    { name: 'nn', title: 'S/N', type: ColumnTypes.Text},
    { name: 'nn', title: 'Assignment NO', type: ColumnTypes.Text},
    { name: 'nn', title: 'Grade', type: ColumnTypes.Text},
    { name: 'nn', title: 'Step No', type: ColumnTypes.Text},
    { name: 'nn', title: 'Salary Scale', type: ColumnTypes.Text},
    { name: 'nn', title: 'President Appointment', type: ColumnTypes.Text},
    { name: 'nn', title: 'Contract Status', type: ColumnTypes.Text},
  ]

  tableColumnia: TableColumn[] = [
    { name: 'nn', title: 'S/N', type: ColumnTypes.Text},
    { name: 'nn', title: 'Date', type: ColumnTypes.Text},
    { name: 'nn', title: 'REF NUMBER', type: ColumnTypes.Text},
    { name: 'nn', title: 'ISSUED BY', type: ColumnTypes.Text},
    { name: 'nn', title: 'TITLE', type: ColumnTypes.Text},
    { name: 'nn', title: 'CATEGORY', type: ColumnTypes.Text},
    { name: 'nn', title: 'STATUS', type: ColumnTypes.Text},
  ]


  ngOnInit(): void {
    
  }

}
