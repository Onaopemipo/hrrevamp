import { MENU_ITEMS } from './../../pages-menu';
import { Component, OnInit } from '@angular/core';
// import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-interviewerdashboard',
  templateUrl: './interviewerdashboard.component.html',
  styleUrls: ['./interviewerdashboard.component.scss']
})
export class InterviewerdashboardComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
    // alert(7777);
  }

}
