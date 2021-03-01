import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'app/components/tablecomponent/models';

@Component({
  selector: 'ngx-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class BenefitViewComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

  topActionClicked() {
    this.showModal = true;
  }

  selectedTab = 1;
  tabChanged(tab: number){
    this.selectedTab = tab;
  }

}
