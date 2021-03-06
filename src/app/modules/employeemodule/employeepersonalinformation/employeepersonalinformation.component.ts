import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-employeepersonalinformation',
  templateUrl: './employeepersonalinformation.component.html',
  styleUrls: ['./employeepersonalinformation.component.scss']
})
export class EmployeepersonalinformationComponent implements OnInit {
  title: string = 'Employee Profile';
  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  hiringChecklist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active' },
    { title: 'work_Info', label: 'Work Information', status: 'Inactive' },
    { title: 'payment_Info', label: 'Payment', status: 'Inactive' },
    { title: 'medical_Info', label: 'Medical Disclosure', status: 'Inactive' },
    { title: 'tax_Info', label: 'Tax', status: 'Inactive' },
    { title: 'document_Info', label: 'Documents', status: 'Inactive' },

  ];

  constructor() { }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.hiringChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.hiringChecklist[i].status = 'Active';
    this.selectedCase = this.hiringChecklist[i].title;
  }

  ngOnInit(): void {
  }

}
