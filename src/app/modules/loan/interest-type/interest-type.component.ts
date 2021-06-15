import { TableColumn, TableAction, TableActionEvent } from './../../../components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateInterestRateServiceProxy, InterestRateDTO, InterestRate, GetInterestRateServiceProxy, ToggleInterestRateServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

enum TABLE_ACTION {
  DELETE = '2',
  // EDIT = '3'
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
    // {name: TABLE_ACTION.EDIT, label: 'Edit'},
    {name: TABLE_ACTION.DELETE, label: 'Delete'},

  ]

  filter = {

  }

  tableActionClicked(event: TableActionEvent){
  if(event.name==TABLE_ACTION.DELETE){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to delete this?', 'Yes').subscribe(dataAction => {
        if(dataAction == 'closed'){
          this.interest.toggleInterestRate(event.data.id).subscribe(data => {
            if(!data.hasError && data.result.isSuccessful == true){
              this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Deleted','OK').subscribe(delData =>{
                this.getAllInterests();
              })
            }
          })
        }
      })
    }
 }

  myHeader: string = 'No record found';
  myDescription: string = 'Clikc the button below to add one';
  myButton: string = 'Add New';
  counter: number = 0;
  interestModal: boolean = false;
  rateModel: InterestRateDTO = new InterestRateDTO;
  allInterestRates: InterestRate [] = [];
  loading: boolean = false;
  btnProcessing: boolean = false;

  constructor(private rateService: AddUpdateInterestRateServiceProxy, private alertMe: AlertserviceService,
    private getRateService: GetInterestRateServiceProxy, private interest: ToggleInterestRateServiceProxy) { }

  ngOnInit(): void {
    this.getAllInterests();
  }

  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.getAllInterests()
  }

  toggleModal(){
    this.interestModal = true;
  }

 createType(){
    this.btnProcessing = true;
   this.rateService.addUpdateIntrestRate(this.rateModel).subscribe(data => {
    this.btnProcessing = false;
    if(!data.hasError && data.result.isSuccessful == true){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'SUCCESS', 'OK').subscribe(res => {
        if(res){
          this.getAllInterests()
          this.interestModal = false;
        }
      });
    }
   }, (error) => {

    if (error.status == 400) {
      this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
    }
  });

  }


 getAllInterests(){
   this.btnProcessing = true;
    this.getRateService.getInterestRate().subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.allInterestRates = data.result;
        this.counter = data.totalRecord;
      }
    }, (error) => {

      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    });

  }

}
