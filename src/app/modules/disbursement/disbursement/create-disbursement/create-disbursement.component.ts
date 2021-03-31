import { MyDisbursement, DisbursementService } from './../../services/disbursement.service';
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

  budgetItem: boolean = false;
  recipient: number = 1;
  recurrence: boolean = false;

  disbursement: MyDisbursement = new MyDisbursement;
  constructor(private disbursementService: DisbursementService) { }

  ngOnInit(): void {
  }

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  changeDisburse(event){
      this.budgetItem = !this.budgetItem;
}

changeRecipient(event){
  this.recipient = event;
}

toggle(event){
  this.recurrence = event;
}


createDisbursement(){
  const data = this.disbursementService.create(this.disbursement).toPromise()
  console.log('Disbursement Added',data)
}

}
