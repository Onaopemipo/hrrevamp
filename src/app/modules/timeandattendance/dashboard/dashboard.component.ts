import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string = 'Time and Attendance';
  constructor() { }
  pageActionClicked(event) {

  }
  ngOnInit(): void {
  }

}
