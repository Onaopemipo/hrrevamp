import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addClick() {
    this.router.navigateByUrl('/disbursement/budget/setup');
  }

}
