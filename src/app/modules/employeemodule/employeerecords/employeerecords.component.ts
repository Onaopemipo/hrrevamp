import { FetchAllEmployeesServiceProxy, EmployeeDTOIListApiResult, EmployeeDTO, IEmployeeDTO, CreateEmployeeServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class MyEmployeeRecords extends EmployeeDTO{
  constructor(dto: EmployeeDTO){
    super(dto);
    // Object.assign(this, dto);
  }

  get name(){
    return this.firstName + ' ' + this.lastName;
  }
}
@Component({
  selector: 'ngx-employeerecords',
  templateUrl: './employeerecords.component.html',
  styleUrls: ['./employeerecords.component.scss']
})
export class EmployeerecordsComponent implements OnInit {
  rbutton = [
    { name: 'bulk_upload',label: 'Bulk Upload', icon: '',outline: true },
    { name: 'add_employee', label: 'Add Employee', icon: 'plus', outline: false },

  ];
  tableColumns = [
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Name' },
    { name: 'department', title: 'Department' },
    { name: 'workEmail', title: 'Email Address' },
    { name: 'jobRole', title: 'Position' },
    { name: 'e', title: '' },
    { name: 'f', title: '' },
  ];

  allMyEmployees: MyEmployeeRecords [] = [];


  constructor(private router: Router, private allemployees: FetchAllEmployeesServiceProxy, private newEmployee: CreateEmployeeServiceProxy) { }
  getbtnaction(actionname) {
    if (actionname == 'bulk_upload') {
      this.router.navigate(['/employeemodule/employeebulkupload'])
    }
    if (actionname == 'add_employee') {
      this.router.navigate(['/employeemodule/viewemployeerecords'])
    }
  }


  ngOnInit(): void {
    console.log('We are here');
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.allemployees.getAllEmployees('',2,1,10).subscribe(data => {
      if(data.hasError){
        console.log('There was an error')
      }
      else{
        this.allMyEmployees = data.result.map(emp => new MyEmployeeRecords(emp));
        console.log('These are your employees', this.allMyEmployees)
      }
    })
  }



}
