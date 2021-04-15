import { BudgetItemDTO, FetchAllBudgetItemsServiceProxy, FetchBudgetItemsServiceProxy, DisbursementBudgetItemAllocation, IDepartmentDTO, FetchBudgetItemServiceProxy } from './../../../../_services/service-proxies';
import { Department, DepartmentDTO, CommonServiceProxy } from 'app/_services/service-proxies';
import { AlertserviceService } from './../../../../_services/alertservice.service';
// import { MyBudgetItemDepartment } from './../../services/budget-item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {


  departments: DepartmentDTO = new DepartmentDTO;
  allDepartments: Department [] = [];
  myBudgetItem: BudgetItemDTO;
  itemAllocation: DisbursementBudgetItemAllocation = new DisbursementBudgetItemAllocation;
  id;


  constructor(private alertMe: AlertserviceService, private budgetItemService: FetchBudgetItemServiceProxy, private common: CommonServiceProxy) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchBudgetItem();
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
    const data = await this.budgetItemService.getBudgetItem(this.id).toPromise();
    this.myBudgetItem = data.result
    console.log('Yo boss', this.myBudgetItem)
  }

  async fetchDepartments(){
    const data = await this.common.getDepartments().toPromise();
    if(!data.hasError){
      this.allDepartments = data.result;
      console.log('My departments', this.allDepartments)
    }
  }

}
