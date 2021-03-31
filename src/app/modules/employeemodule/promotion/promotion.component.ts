import { AlertserviceService } from './../../../_services/alertservice.service';
import { PromotionListServiceProxy, Sp_FetchEligibleEmployees } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'EMPLOYEE' },
    { name: 'c', title: 'PREVIOUS ROLE' },
    { name: 'd', title: 'PERIOD SPENT' },
    { name: 'e', title: 'PROBATION PERIOD' },
    { name: 'f', title: 'NEXT POSITION' },
    { name: 'g', title: 'LAST PROMOTION' },
    { name: 'h', title: 'SUBMITTED' },
    { name: 'K', title: 'STATUS' },
  ];

  rButton = [
    {name: 'submit', label: 'Submit List'},
    {name: 'save', label: 'Save List', outline: true},
  ]

  promotionList: Sp_FetchEligibleEmployees [] = [];

  constructor(private promotion: PromotionListServiceProxy, private alert: AlertserviceService) { }

  ngOnInit(): void {
  }

 async getPromotionList(){
    const data = await this.promotion.promotionList(1,1).toPromise()
    if(data.hasError){
      this.promotionList = data.result;
    }
    else{
    this.alert.openModalAlert('Error', 'Error fetching data', 'Dismiss')
    }
  }

  onTopActionClick(event){
    if(event === 'submit'){
      console.log('I am Submitting')
    } else {
      console.log('I am saving')
    }
  }

}
