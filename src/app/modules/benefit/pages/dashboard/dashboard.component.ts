import { Component, OnInit } from '@angular/core';
import { IRequiredButton } from 'app/components/componentsheader/componentsheader.component';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  topActionButtons: IRequiredButton[] = [
    {name: '', label: 'Manage Employees', outline: false, icon: ''},
    {name: '', label: 'Create Benefit', outline: true, icon: ''},
  ];
  constructor() { }

  totalBudget = 1000000;

  ngOnInit(): void {
  }

}
