import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-employee-master-search',
  templateUrl: './employee-master-search.component.html',
  styleUrls: ['./employee-master-search.component.scss']
})
export class EmployeeMasterSearchComponent implements OnInit {

  @Input() selectionHeader = 'Select Employees';
  constructor() { }

  ngOnInit(): void {
  }

  showModal = false;

  showMasterSearchModal() {
    this.showModal = true;
  }
}
