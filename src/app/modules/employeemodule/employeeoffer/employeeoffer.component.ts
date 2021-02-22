import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-employeeoffer',
  templateUrl: './employeeoffer.component.html',
  styleUrls: ['./employeeoffer.component.scss']
})
export class EmployeeofferComponent implements OnInit {
  beginSetup = true;
  constructor(private router: Router) { }
  viewoffer() {
    this.beginSetup = false;
 
  }
  acceptoffer() {
    this.router.navigate([''])
  }
  ngOnInit(): void {
  }

}
