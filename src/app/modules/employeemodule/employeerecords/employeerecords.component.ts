import { FetchAllEmployeesServiceProxy, EmployeeDTOIListApiResult, EmployeeDTO, IEmployeeDTO, CreateEmployeeServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnTypes, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
enum ACTIONS { EDIT = '1', VIEW="4"}
class MyEmployeeRecords extends EmployeeDTO{
  loading: boolean = false;
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
  searchabletableColum = [
    { name: 'id', title: 'ID', type: ColumnTypes.Text },
    { name: 'firstName', title: 'Firstname', type: ColumnTypes.Text },
    { name: 'lastName', title: 'Lastname', type: ColumnTypes.Text},
    { name: 'workEmail', title: 'Email Address', type: ColumnTypes.Text },
    { name: 'workMobile', title: 'Phone Number', type: ColumnTypes.Text },
  ];
  tableColumns = [
    { name: 'id', title: 'ID', type: ColumnTypes.Text },
    { name: 'firstName', title: 'Firstname', type: ColumnTypes.Text },
    { name: 'lastName', title: 'Lastname', type: ColumnTypes.Text},
    { name: 'workEmail', title: 'Email Address', type: ColumnTypes.Text },
    { name: 'workMobile', title: 'Phone Number', type: ColumnTypes.Text },
  ];
  tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: 'View' },
    { name: ACTIONS.EDIT, label: 'Edit' },
  ];

  allMyEmployees: MyEmployeeRecords [] = [];
  filter = {
    searchText: null,
    contractStatus: undefined,
    pageSize: 10,
    pageNumber: 1
  }
  totalItems = 0;
  currentPage = 1;
  loading: boolean = false;
  constructor(private router: Router, private allemployees: FetchAllEmployeesServiceProxy, private newEmployee: CreateEmployeeServiceProxy) { }
  get showEmpty() {
    return this.allMyEmployees.length === 0;
  }

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
  tableActionClicked(event: TableActionEvent) {
    console.log('am here')
    if (event.name == "1") {
      this.router.navigate(['/employeemodule/viewemployeerecords'],{queryParams:{employee_id:event.data.id}})
    }
    if (event.name == "4") {
      this.router.navigate(['/employeemodule/viewemployeerecords'],{queryParams:{employee_id:event.data.id}})
    }
  }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.loading = true;
    this.allemployees.getAllEmployees(this.filter.searchText, this.filter.contractStatus, this.filter.pageSize, this.filter.pageNumber)
      .subscribe(data => {
      if(data.hasError){
        console.log('There was an error')
      }
      else {
        
        this.allMyEmployees = data.result.map(emp => new MyEmployeeRecords(emp));
        this.totalItems = data.totalRecord;
        console.log('These are your employees', this.allMyEmployees)
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
    })
  }



}
