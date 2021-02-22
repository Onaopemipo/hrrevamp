import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';

@Component({
  selector: 'ngx-onboardingemployees',
  templateUrl: './onboardingemployees.component.html',
  styleUrls: ['./onboardingemployees.component.scss']
})
export class OnboardingemployeesComponent implements OnInit {
  title: string = "All Employees"
  columns: TableColumn[] = [
    {name: 'id', title: 'ID', type: ColumnTypes.Text},
    {name: 'name', title: 'Name', type: ColumnTypes.Text},
    {name: 'job_position', title: 'Job Position', type: ColumnTypes.Text},
    {name: 'department', title: 'Department', type: ColumnTypes.Text},
    { name: 'reporting_manager', title: 'Reporting Manager', type: ColumnTypes.Text },
    {name: 'date_joining', title: 'Date of Joining', type: ColumnTypes.Date},
    {name: 'status', title: 'Onboarding Status', type: ColumnTypes.Status},
  ];
  employeeData = [];
  constructor() { }

  ngOnInit(): void {
  }

}
