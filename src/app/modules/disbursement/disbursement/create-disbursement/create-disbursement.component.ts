import { Component, OnInit } from '@angular/core';

enum TABS {
  SINGLE, BULK
}

@Component({
  selector: 'ngx-create-disbursement',
  templateUrl: './create-disbursement.component.html',
  styleUrls: ['./create-disbursement.component.scss']
})
export class CreateDisbursementComponent implements OnInit {

  selectedTab = TABS.SINGLE;
  TABS = TABS;
  constructor() { }

  ngOnInit(): void {
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

}
