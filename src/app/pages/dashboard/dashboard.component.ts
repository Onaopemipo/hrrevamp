import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pagetitle = 'Dashboard';
  rbutton = [
    { name: 'New Plan',icon: '',outline: true },
    { name: 'Add New',icon: 'plus',outline: false },
   
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
