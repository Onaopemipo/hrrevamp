import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-myattendance',
  templateUrl: './myattendance.component.html',
  styleUrls: ['./myattendance.component.scss']
})
export class MyattendanceComponent implements OnInit {
  title: string = 'My Attendance';
  tableColumns = [
    { name: 'a', title: 'Shift' },
    { name: 'b', title: 'Date' },
    { name: 'c', title: 'Expected Clock In' },
    { name: 'd', title: 'Expected Clock Out' },
    { name: 'e', title: 'Clock In Iime' },
    { name: 'f', title: 'Clock Out Iime' },
    { name: 'e', title: 'Lateness' },
    { name: 'e', title: 'Overtime' },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
