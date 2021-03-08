import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    { name: 'a', title: 'ID' },
    { name: 'b', title: 'Name' },
    { name: 'c', title: 'Department' },
    { name: 'd', title: 'Email Address' },
    { name: 'd', title: 'Position' },
    { name: 'e', title: '' },
    { name: 'f', title: '' },
  ];
  constructor(private router: Router) { }
  getbtnaction(actionname) {
    if (actionname == 'bulk_upload') {
      this.router.navigate(['/employeemodule/employeebulkupload'])
    }
    if (actionname == 'add_employee') {
      this.router.navigate(['/employeemodule/viewemployeerecords'])
    }
  }

  ngOnInit(): void {
  }

}
