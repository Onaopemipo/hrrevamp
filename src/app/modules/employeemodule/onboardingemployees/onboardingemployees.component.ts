import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { FetchEmployeeOnboardingDataDetailsServiceProxy,EmployeeOnboardingPersonalData } from '../../../_services/service-proxies'
@Component({
  selector: 'ngx-onboardingemployees',
  templateUrl: './onboardingemployees.component.html',
  styleUrls: ['./onboardingemployees.component.scss']
})
export class OnboardingemployeesComponent implements OnInit {
  title: string = 'All Employees';
  columns: TableColumn[] = [
    { name: 'id', title: 'ID', type: ColumnTypes.Text },
    { name: 'name', title: 'Name', type: ColumnTypes.Text },
    { name: 'job_position', title: 'Job Position', type: ColumnTypes.Text },
    { name: 'department', title: 'Department', type: ColumnTypes.Text },
    { name: 'reporting_manager', title: 'Reporting Manager', type: ColumnTypes.Text },
    { name: 'date_joining', title: 'Date of Joining', type: ColumnTypes.Date },
    { name: 'status', title: 'Onboarding Status', type: ColumnTypes.Status },
  ];
  onBoarding:EmployeeOnboardingPersonalData[]=[]
 loading: boolean= false
  companyId : number = 0;
  onboardingId:number= 0;
  dataValue:number = 0;
  showEmpty: number = 0
  constructor(private FetchEmployeeOnboardingDataDetailsServiceProxy: FetchEmployeeOnboardingDataDetailsServiceProxy) { }

  ngOnInit(): void {
    this.getAllEmployeeOnboarding()
  }
  async getAllEmployeeOnboarding(){
   this.loading= false
   const data= await this.FetchEmployeeOnboardingDataDetailsServiceProxy.fetchEmployeeOnboardingDataDetails(this.companyId,this.onboardingId).toPromise()
    if(!data.hasError){
      this.onBoarding = data.result;
      this.dataValue=data.totalRecord

    }
  }
  modal(buttom){
    if(buttom === 'add_leave_year') {
      alert('modal')
    }
  }
}
