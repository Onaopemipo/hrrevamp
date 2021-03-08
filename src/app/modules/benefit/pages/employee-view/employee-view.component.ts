import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from 'app/components/tablecomponent/models';

@Component({
  selector: 'ngx-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  rButton = [
    {name: '', label: 'Add Benefit', icon: 'plus', outline: false}
  ];

  columns: TableColumn[] = [
    {name: '', title: 'Coverage', },
    {name: '', title: 'Start', },
    {name: '', title: 'End Date', },
    {name: '', title: 'Effective Date', },
  ];

  showModal = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  selectedTab = 1;
  tabChanged(tab: number) {
    this.selectedTab = tab;
  }
  topActionClicked() {
    this.router.navigateByUrl('/benefit/add-benefit')
  }
  showAddModal(){
    this.showModal = true;
  }

}
