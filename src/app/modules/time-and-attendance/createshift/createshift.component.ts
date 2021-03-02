import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-createshift',
  templateUrl: './createshift.component.html',
  styleUrls: ['./createshift.component.scss']
})
export class CreateshiftComponent implements OnInit {
  title: string = 'New Shifts';
  tableColumns = [
    { name: 'a', title: 'Day' },
    { name: 'b', title: 'Shift 1 (15:39:20 - 15:45:23)' },
    { name: 'c', title: 'Shift 2 (15:39:20 - 15:45:23)' },
    { name: 'd', title: 'Shift 3 (15:39:20 - 15:45:23)' },
    { name: 'e', title: 'Shift 4 (15:39:20 - 15:45:23)' },
  
  ];
  setPeriodtableColumns = [
    { name: 'a', title: 'Name' },
    { name: 'b', title: 'Clock-In Time' },
    { name: 'c', title: 'Clock-Out Time' },
    { name: 'd', title: 'Lateness Permit' },
    { name: 'e', title: 'Overtime' },
  
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
