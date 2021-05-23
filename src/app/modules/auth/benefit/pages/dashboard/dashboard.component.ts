import { Component, OnInit } from '@angular/core';
import { IRequiredButton } from 'app/components/componentsheader/componentsheader.component';
import { FetchEmployeeCoverageBenefitServiceProxy } from '../../../../../_services/service-proxies';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  topActionButtons: IRequiredButton[] = [
    {name: '', label: 'Manage Employees', outline: false, icon: ''},
    {name: '', label: 'Create Benefit', outline: true, icon: ''},
  ];
  constructor( private benefitscoverages : FetchEmployeeCoverageBenefitServiceProxy) { }

  

  totalBudget = 1000000;

  ngOnInit(): void {
    this.getBenefitsCoverage()
  }

  iD:number= 0;
  coverageName?:string='';
  companyID?:number=1;
  employeeID?:number=1;
  subID? : number=0;
  pageNumber?:number=1;
  pageSize?:number = 1000;
  coveragePlanId?: number =0;
  eligibilityTypeId?:number = 0;

  //get all employee coverages
   async getBenefitsCoverage(){
    const CoverageData= await this.benefitscoverages.fetchEmployeeCoverageBenefit(this.iD,this.coverageName,this.coveragePlanId,this.employeeID,this.subID,this.eligibilityTypeId,this.subID,this.pageNumber,this.pageSize)
    .toPromise()
    if(!CoverageData.hasError){
      console.log('my coveragedATA',CoverageData)
    }
  }

}


