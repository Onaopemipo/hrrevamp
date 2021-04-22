import { AddUpdateInterestRateServiceProxy, InterestRateDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-interest-type',
  templateUrl: './interest-type.component.html',
  styleUrls: ['./interest-type.component.scss']
})
export class InterestTypeComponent implements OnInit {

  myHeader: string = 'No record found';
  myDescription: string = 'Clikc the button below to add one';
  myButton: string = 'Add New';
  defaultPage: number = 0;
  interestModal: boolean = false;
  rateModel: InterestRateDTO = new InterestRateDTO;

  constructor(private rateService: AddUpdateInterestRateServiceProxy) { }

  ngOnInit(): void {
  }

  toggleModal(){
    this.interestModal = true;
  }

  createType(){

  }

}
