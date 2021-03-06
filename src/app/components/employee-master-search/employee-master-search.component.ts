import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-employee-list',
  template: `    
    <div style="display: inline-flex;">
      <div *ngFor="let i of [1,2,3,4,5]">
          <img style="width: 3rem; height: 3rem; border-radius: 50%; margin-left: -0.5rem;"  src="https://via.placeholder.com/300/09f.png/fff%20C/O%20https://placeholder.com/"/>
      </div>
    </div>
`,
  styleUrls: ['./employee-master-search.component.scss']
})
export class EmployeeListComponent {
}

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
