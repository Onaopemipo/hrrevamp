import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateInterestRateServiceProxy, InterestRateDTO,InterestRate, GetInterestRateServiceProxy } from './../../../_services/service-proxies';
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
  allInterestRates: InterestRate [] = [];

  constructor(private rateService: AddUpdateInterestRateServiceProxy, private alertMe: AlertserviceService,
    private getRateService: GetInterestRateServiceProxy) { }

  ngOnInit(): void {
  }

  toggleModal(){
    this.interestModal = true;
  }

  async createType(){
    const data = await this.rateService.addUpdateIntrestRate(this.rateModel).toPromise();
    if(data.result.isSuccessful == true){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Added Successfully', 'Dismiss').subscribe(data => {
        if(data == 'closed'){
          this.interestModal = false;
        }
      });
    }
  }


  async getAllInterests(){
    const data = await this.getRateService.getInterestRate().toPromise();
    if(!data.hasError){
      this.allInterestRates = data.result;
    }
  }

}
