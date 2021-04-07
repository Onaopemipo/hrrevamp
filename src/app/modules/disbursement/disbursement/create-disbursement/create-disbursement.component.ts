import { Component, OnInit } from '@angular/core';
import { DisbursementService } from '../../services/disbursement.service';

enum TABS {
  SINGLE, BULK
}

@Component({
  selector: 'ngx-create-disbursement',
  templateUrl: './create-disbursement.component.html',
  styleUrls: ['./create-disbursement.component.scss']
})
export class CreateDisbursementComponent implements OnInit {
  channel:string='';
  disburse_from:number=1;
  budget_item_name:string=''

  selectedTab = TABS.SINGLE;
  TABS = TABS;
  constructor(private disbursement: DisbursementService ) { }

  ngOnInit(): void {
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

}
