import { EmployeeDTO, IEmployeeDTO, CreateEmployeeServiceProxy, DropdownValue, DropdownValueDTO,  DataServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-employeerecordsview',
  templateUrl: './employeerecordsview.component.html',
  styleUrls: ['./employeerecordsview.component.scss']
})
export class EmployeerecordsviewComponent implements OnInit {
  title: string = "Employee Profile"
  selectedCase: string = 'profile_panel';
  selectedPanel: any ={ title: 'profile_panel', label: 'Profile', status: 'Active' };
  hiringChecklist = [
    { title: 'profile_panel', label: 'Profile', status: 'Active' },
    { title: 'contract_panel', label: 'Contract', status: 'Inactive' },
    { title: 'document_panel', label: 'Document Upload', status: 'Inactive' },
    { title: 'qualification_Info', label: 'Qualification', status: 'Inactive' },
    { title: 'bank_panel', label: 'Bank Profile', status: 'Inactive' },
    { title: 'kin_panel', label: 'Next of Kin', status: 'Inactive' },
    { title: 'contact_panel', label: 'Contact', status: 'Inactive' },
    { title: 'pension_panel', label: 'Pension', status: 'Inactive' },
    { title: 'History_panel', label: 'History', status: 'Inactive' },
    { title: 'skills_panel', label: 'Skills', status: 'Inactive' },
    { title: 'custom_panel', label: 'Custom Form', status: 'Inactive'},
  ];

  newEmployeeForm: NgForm;
  createNewEmployee: EmployeeDTO = new EmployeeDTO().clone();

  maritalStatusValues: DropdownValue[] = [];
  genderValues: DropdownValue[] = [];
  religionValues: DropdownValue[]  = [];
  employmentStatusValues: DropdownValue[]  = [];
  // allgender: string [] = [];

  constructor(private newEmployee: CreateEmployeeServiceProxy, private myDropdown: DataServiceProxy ) { }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.hiringChecklist.forEach(value => {
      value.status = 'Inactive';
    })
    this.hiringChecklist[i].status = 'Active';
    this.selectedCase = this.hiringChecklist[i].title;
  }
  ngOnInit(): void {
    this.getMaritalStatus();
    this.getEmploymentStatus();
    this.getGender();
    this.getReligion();
  }

  async getDropDownValue(id, variable: DropdownValue[]){
    let response = await this.myDropdown.getDropDownValuesById(4).toPromise();
    variable = response.result;
  }

  getMaritalStatus(){
    this.myDropdown.getDropDownValuesById(4).subscribe(data => {
      if(!data.hasError){
        this.maritalStatusValues = data.result;
        console.log(this.maritalStatusValues)
      }
      else {
        console.log('There was an error')
      }
    })
  }

  getEmploymentStatus(){
    this.myDropdown.getDropDownValuesById(1).subscribe(data => {
      if(!data.hasError){
        this.employmentStatusValues = data.result;
        console.log(this.employmentStatusValues)
      }
      else {
        console.log('There was an error')
      }
    })
  }

  getReligion(){
    this.myDropdown.getDropDownValuesById(8).subscribe(data => {
      if(!data.hasError){
        this.religionValues = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }


  getGender(){
    this.myDropdown.getDropDownValuesById(12).subscribe(data => {
      if(!data.hasError){
         this.genderValues = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }

  createEmployee(){
    this.newEmployee.addEmployee(this.createNewEmployee).subscribe(data => {
      if(data.hasError){
        console.log('There was an error');
      }
      else {
        console.log(data.message)
      }
    })
  }

}
