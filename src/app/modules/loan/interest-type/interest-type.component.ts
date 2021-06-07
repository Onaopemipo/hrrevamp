import { TableColumn, TableAction } from './../../../components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateInterestRateServiceProxy, InterestRateDTO,InterestRate, GetInterestRateServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

enum TABLE_ACTION {
  DELETE = '2',
  EDIT = '3'
}
@Component({
  selector: 'ngx-interest-type',
  templateUrl: './interest-type.component.html',
  styleUrls: ['./interest-type.component.scss']
})
export class InterestTypeComponent implements OnInit {

  interestTypeTable: TableColumn [] = [
    {name: 'id', title: 'Code'},
    {name: 'rate', title: 'Type Name'},
    {name: 'description', title: 'Description'},
  ];

  tableActions: TableAction[] = [
    {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},

  ]

  myHeader: string = 'No record found';
  myDescription: string = 'Clikc the button below to add one';
  myButton: string = 'Add New';
  counter: number = 0;
  interestModal: boolean = false;
  rateModel: InterestRateDTO = new InterestRateDTO;
  allInterestRates: InterestRate [] = [];
  loading: boolean = false;

  constructor(private rateService: AddUpdateInterestRateServiceProxy, private alertMe: AlertserviceService,
    private getRateService: GetInterestRateServiceProxy) { }

  ngOnInit(): void {
    this.getAllInterests();
  }

  toggleModal(){
    this.interestModal = true;
  }

  async createType(){
    this.loading = true;
    const data = await this.rateService.addUpdateIntrestRate(this.rateModel).toPromise();
    this.loading = false;
    if(!data.hasError && data.result.isSuccessful == true){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Added Successfully', 'Dismiss').subscribe(res => {
        if(res){
          this.getAllInterests()
          this.interestModal = false;
        }
      });
    }
  }


 getAllInterests(){
   this.loading = true;
    this.getRateService.getInterestRate().subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.allInterestRates = data.result;
        this.counter = data.totalRecord;
      }
    });

  }

}
