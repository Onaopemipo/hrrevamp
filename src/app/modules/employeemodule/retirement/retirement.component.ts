import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetirmentDTO, RetirementServiceProxy, RetirmentDTOListApiResult } from '../../../_services/service-proxies';


enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}


@Component({
  selector: 'ngx-retirement',
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.scss']
})
export class RetirementComponent implements OnInit {

  topActionButtons = [

    { name: TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT, label: 'Initiate Retirement', 'icon': 'plus', outline: false },
  ];


  tableColumns = [
    { name: 'id', title: 'id' },
    { name: 'fullName', title: 'Full Name' },
    { name: 'appointmentDate', title: 'Date Requested' },
    { name: 'effectiveDate', title: 'End Date' },
    { name: 'retirementType', title: 'Type' },
    { name: 'log_status', title: 'Status' },
  ];
  data: RetirmentDTO[] = []
  startdte?: string = '';
  enddte?: string = '';
  searchText?: string = '';
  searchType?: number = 1;
  page?: number = 1;
  _selected?: string = '';
  startdate?: Date = new Date();
  endate?: Date = new Date();
  pageSize?: number = 1;
  pageNumber?: number = 1

  constructor(private router: Router,
    private RetirementServiceProxy: RetirementServiceProxy) { }

  ngOnInit(): void {
    this.RetirementServiceProxy.getAllRetire(this.startdte, this.enddte, this.searchText, this.searchType,
      this.page, this._selected, this.startdate, this.endate, this.pageSize, this.pageNumber).toPromise()
      .then(result =>{this.data = result.result} )
  }
   getRetiree(){
    //  this.RetirementServiceProxy.getRetirees(this.startdte,this.enddte,this.searchText,this.searchType,this.page,
    //   this._selected,this.startdate,this.endate,this.pageSize,this.pageNumber).toPromise()
    //   .then(res =>{
    //     alert('success')
    //   })
   }
  modal(buttion) {
    // (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
    //  this.showAddPlanModal = true;
    //  }
    if (buttion === TOP_ACTIONS.INITIATE_VOLUNTARY_EXIT) {
      this.router.navigate(['/employeemodule/exitform'], { queryParams: { a: "b" } });
    }
  }
  
}
