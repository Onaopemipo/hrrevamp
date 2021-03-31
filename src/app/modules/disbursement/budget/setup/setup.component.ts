import { MyBudgetItem } from './../../services/budget-item.service';
import { MyBudget, BudgetService } from './../../services/budget.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  budget: MyBudget = new MyBudget;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
  }

  page = 1;

  gotoBudgetItems() {
    alert(this.page = 2);
    console.log('hdjdhdhdh')
  }

  addBudget(){

  //  let startYear = this.budget.financial_year_start;
  //   let endYear = this.budget.financial_year_end;
    const data = this.budgetService.create(this.budget).toPromise()
    console.log('Success', data);


  }

}
