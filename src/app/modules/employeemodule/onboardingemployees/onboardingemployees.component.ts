import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStatus, MyColor } from 'app/components/status/models';
import { ACTIONS, ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { FetchEmployeeOnboardingDataDetailsServiceProxy, EmployeeOnboardingPersonalData, OnboardingPersonalInfo } from '../../../_services/service-proxies';

export class onboardPersonWithStatus extends OnboardingPersonalInfo implements IStatus {

  onboardPerson: OnboardingPersonalInfo;
  onboardingId: number = 0;
  fullname: string = "";

  constructor(onboardPerson: OnboardingPersonalInfo) {
    super(onboardPerson);
    this.onboardPerson = onboardPerson;

  }
  get status() {
    return this.onboardPerson.completedOnboarding;
  }
  getStatusLabel() {
    if (this.onboardPerson.completedOnboarding === true) return 'Accepted';
    if (this.onboardPerson.completedOnboarding === false) return 'Pending';
 

  }
  getStatusColor() {
    if (this.onboardPerson.completedOnboarding === false) return new MyColor(242, 153, 74);
    if (this.onboardPerson.completedOnboarding ===true) return new MyColor(0, 153, 74);

    return new MyColor(253, 238, 238);
  }
}
@Component({
  selector: 'ngx-onboardingemployees',
  templateUrl: './onboardingemployees.component.html',
  styleUrls: ['./onboardingemployees.component.scss']
})
export class OnboardingemployeesComponent implements OnInit {
  title: string = 'Onboarding Employees';
  tableColumns: TableColumn[] = [
    { name: 'fullname', title: 'Name', type: ColumnTypes.Text },
    { name: 'degree', title: 'Degree', type: ColumnTypes.Text },
    { name: 'fieldofStudy', title: 'Field Of Study', type: ColumnTypes.Text },
    { name: 'personalEmail', title: 'Personal Email', type: ColumnTypes.Text },
    { name: 'dateofBirth', title: 'Dirth of Birth', type: ColumnTypes.Date }, 
    { name: 'completedOnboarding', title: 'Onboarding Status', type: ColumnTypes.Status },
  ];
  tableActions: TableAction[] = [
    { name: ACTIONS.VIEW, label: 'View' },
  ];
  filter = {
    yearStartDate: null,
    yearName: null,
    onboardingId: 0,
    companyId: 0,
    pageSize: 10,
    pageNumber: 1
  }
  totalItems = 0;
  currentPage = 1;
  onBoarding=[]
 loading: boolean= false


  constructor(private FetchEmployeeOnboardingDataDetailsServiceProxy: FetchEmployeeOnboardingDataDetailsServiceProxy,
  private router: Router, private alertservice: AlertserviceService) { }
  tableActionClicked(event: TableActionEvent) {
    if (event.name == ACTIONS.VIEW) {
this.router.navigate(['/employeemodule/employeeonboarding'],{queryParams:{onboardingId:event.data.onboardingId}})
    }
    if (event.name == ACTIONS.DELETE) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.CONFIRM, event.data.yearName, 'Yes').subscribe(data => {
        if (data == "closed") {
         
        }

      })
    }
  }
  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.getAllEmployeeOnboarding();
  }
  get showEmpty() {
    return this.onBoarding.length === 0;
  }
  ngOnInit(): void {
    this.getAllEmployeeOnboarding()
  }
  async getAllEmployeeOnboarding(){
    this.loading = true;
   const data= await this.FetchEmployeeOnboardingDataDetailsServiceProxy.fetchEmployeeOnboardingDataDetails(this.filter.companyId,this.filter.onboardingId).toPromise()
    
    if (!data.hasError) {
      this.loading = false;
      data.result.forEach(value => {
        let PInfo = new onboardPersonWithStatus(value.onboardingPersonalInfo);
        PInfo.onboardingId = value.onboardingId;
        PInfo.fullname = PInfo.firstName + " " + PInfo.lastName;
        this.onBoarding.push(PInfo);
      })

      console.log(this.onBoarding);
      this.totalItems=data.totalRecord

    } else {
      this.loading = false;
    }
  }
  gotohiring() {
    this.router.navigate(['/employeemodule/employeeonboarding']);
  }
}
