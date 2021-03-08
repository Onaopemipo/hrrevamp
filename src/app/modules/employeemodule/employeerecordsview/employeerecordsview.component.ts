import { Component, OnInit } from '@angular/core';

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
    { title: 'custom_panel', label: 'Custom Form', status: 'Inactive' },
  ];
  constructor() { }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;
    
    this.hiringChecklist.forEach(value => {
      value.status = 'Inactive';
    })
    this.hiringChecklist[i].status = 'Active';
    this.selectedCase = this.hiringChecklist[i].title; 
  }
  ngOnInit(): void {
  }

}
