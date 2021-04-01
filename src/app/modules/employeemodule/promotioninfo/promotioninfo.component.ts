import { AlertserviceService } from './../../../_services/alertservice.service';
import { FetchEmployeeByIdServiceProxy, EmployeeDTO, PromotionListServiceProxy, Sp_FetchEligibleEmployees, FetchEmployeeContractByEmployeeIdServiceProxy, EmployeeContractAssignmentDTO } from './../../../_services/service-proxies';
import { EmployeesService } from './../../career-succession/services/employees.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-promotioninfo',
  templateUrl: './promotioninfo.component.html',
  styleUrls: ['./promotioninfo.component.scss']
})
export class PromotioninfoComponent implements OnInit {


  tableColumns = [
    { name: 'a', title: 'Name of Qualification' },
    { name: 'b', title: 'Type' },
    { name: 'c', title: 'Course' },
    { name: 'd', title: 'Institution' },
    { name: 'e', title: 'Start Date' },
    { name: 'f', title: 'End Date' },
  ];

  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname: 'person' },
    { title: 'promotion_info', label: 'Promotion Information', status: 'Inactive' , iconname: 'volume-down'},

  ];

  employeeDetails: EmployeeDTO = new EmployeeDTO().clone();
  contractDetails: EmployeeContractAssignmentDTO = new EmployeeContractAssignmentDTO;


  constructor(private employee: FetchEmployeeByIdServiceProxy, private alert: AlertserviceService,
     private contract: FetchEmployeeContractByEmployeeIdServiceProxy) { }


  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.employeeviewlist.forEach(value => {
      value.status = 'Inactive';
    });
    this.employeeviewlist[i].status = 'Active';
    this.selectedCase = this.employeeviewlist[i].title;
  }
  ngOnInit(): void {

  }

  async getEmployeeInfo(){
    const data = await this.employee.getEmployeeById(1).toPromise();
    if(!data.hasError){
      this.employeeDetails = data.result;
      console.log('Success', this.employeeDetails)
    }
  }

  async getContractDetails(){
    const data = await this.contract.fetchEmployeeContractByEmployeeId(1).toPromise();
    if(!data.hasError){
      this.contractDetails = data.result;
    }
  }


}
