import { AlertserviceService } from 'app/_services/alertservice.service';
import { BudgetDTO, AddUpdateBudgetServiceProxy, ManageBudgetDTO } from './../../../../_services/service-proxies';
import { MyBudgetItem } from './../../services/budget-item.service';
import { MyBudget, BudgetService } from './../../services/budget.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  budget: ManageBudgetDTO = new ManageBudgetDTO;

  constructor(private budgetService: AddUpdateBudgetServiceProxy, private alert: AlertserviceService) { }

  ngOnInit(): void {
  }

  page = 1;

  budgetForm: NgForm;

  gotoBudgetItems() {
    alert(this.page = 2);
  }

  async addBudget(){
  const data = await this.budgetService.addUpdateBudget(this.budget).toPromise();
  if(!data.hasError){
  this.alert.openModalAlert('Budget Created', 'Budget Added Successfully', 'Dismiss');
  } else {
    console.log(data.message)
  }
  }



}
