import { BudgetItemDTO, FetchAllBudgetItemsServiceProxy, FetchGetBudgetServiceProxy, FetchBudgetItemsServiceProxy, FetchGetBudgetItemServiceProxy } from './../../../../_services/service-proxies';
import { Department, DepartmentDTO } from './../../../../_services/service-proxies';
import { AlertserviceService } from './../../../../_services/alertservice.service';
// import { MyBudgetItemDepartment } from './../../services/budget-item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {

  // departments: MyBudgetItemDepartment = new MyBudgetItemDepartment;
  departments: DepartmentDTO [] = [];
  allDepartments: Department [] = [];
  myBudgetItem: BudgetItemDTO;
  id;


  constructor(private alertMe: AlertserviceService, private budgetItemService: FetchGetBudgetItemServiceProxy) { }

  ngOnInit(): void {
  }

  updateBudgetItem(e){

  }

  addDepartment(){
    let myDepartment: DepartmentDTO [];
    myDepartment.push()
    this.alertMe.openModalAlert('confirm','Added', 'Dismiss')
    console.log(myDepartment);
  }

  async fetchBudgetItem(){
    const data = await this.budgetItemService.getGetBudgetItem(this.id).toPromise();
    this.myBudgetItem = data.result
    console.log('Yo boss', this.myBudgetItem)
  }

}
