import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string = 'Time and Attendance';
  rbutton = [
    { name: 'create_shift', label: 'Create Shift', icon: '', outline: true },
    { name: 'create_project', label: 'Create Project', icon: '', outline: false },
    
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
