import { Certification } from 'app/_services/service-proxies';
import { map } from 'rxjs/operators';
import { FetchEmployeeByIdServiceProxy, EmployeeDTO, EmployeeContractAssignmentDTO, FetchAllEmployeesServiceProxy } from './../../../_services/service-proxies';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeesService, MyEmployeeDatail, } from '../services/employees.service';
import { throwIfAlreadyLoaded } from 'app/@core/module-import-guard';


class MyEmployeeDTO extends EmployeeDTO{
  get position_name(){
    return this.contracts[0].positionName;
  }

  get departmentName(){
    return this.contracts[0].departmentName;
  }

  get jobName(){
    return this.contracts[0].jobName;
  }

  get locationName(){
    return this.contracts[0].locationName;
  }
  get gradeName(){
    return this.contracts[0].gradeName;
  }

  get myCertifications(){
    return this.certifications[0]
  }

  get mySkills(){
    return this.skills[0];
  }

  myCertification

  get myQualifications(){
    return this.qualifications[0] ;
  }


}
@Component({
  selector: 'ngx-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  data: MyEmployeeDatail = new MyEmployeeDatail({});
  successionTable: TableColumn[] = [
    { name: 'name', title: 'Name' },
    { name: 'position', title: 'Position' },
    { name: 'experience', title: 'Experience' },
    { name: 'qualification', title: 'Qualification' },
    { name: 'certification', title: 'certification' },
  ];

  employeeData: MyEmployeeDTO = new MyEmployeeDTO;
  employeeContractData: EmployeeContractAssignmentDTO = new EmployeeContractAssignmentDTO
  employeeId: number = 0;
  planStatus: boolean = false;

  constructor(private navCtrl: Location,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService, private employee: FetchEmployeeByIdServiceProxy, private allEmployees: FetchAllEmployeesServiceProxy) { }

  async ngOnInit() {
    let subscription: Subscription = null;
    subscription = this.activatedRoute.paramMap.subscribe(params => {
      this.employeeId = parseInt(params.get('id'));

      // subscription.unsubscribe();
      this.employeeService.fetch(this.employeeId).toPromise().then(response => {
        this.data = response;
      })
    });

    this.fetchAllEmployees();
    this.fetchProfile();
  }

  goback() {
    this.navCtrl.back();
  }

  async fetchProfile(){
    const data = await this.employee.getEmployeeById(this.employeeId).toPromise();
    if(!data.hasError){
      this.employeeData = new MyEmployeeDTO(data.result);
    //  this.employeeData.contracts
      console.log('My Details', this.employeeData);
      console.log('My Contract', this.employeeContractData);
    }
  }

  async fetchAllEmployees(){
    const data = await this.allEmployees.getAllEmployees('',1,10,1).toPromise();
    if(!data.hasError){
      console.log(data.result);
    }
  }

  addPlan() {
    // this.data.location_name
    this.data.skills[0].point
  }
}
