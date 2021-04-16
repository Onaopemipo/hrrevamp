import { FetchEmployeeByIdServiceProxy, EmployeeDTO } from './../../../_services/service-proxies';
import { TableColumn } from './../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeesService, MyEmployeeDatail, } from '../services/employees.service';
import { throwIfAlreadyLoaded } from 'app/@core/module-import-guard';

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

  employeeData: EmployeeDTO = new EmployeeDTO;
  employeeId: number = 0;

  constructor(private navCtrl: Location,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService, private employee: FetchEmployeeByIdServiceProxy) { }

  async ngOnInit() {
    let subscription: Subscription = null;
    subscription = this.activatedRoute.paramMap.subscribe(params => {
      this.employeeId = parseInt(params.get('id'));

      // subscription.unsubscribe();
      this.employeeService.fetch(this.employeeId).toPromise().then(response => {
        this.data = response;
      })
    });
  }

  goback() {
    this.navCtrl.back();
  }

  async fetchProfile(){
    const data = await this.employee.getEmployeeById(1).toPromise();
    if(!data.hasError){
      this.employeeData = data.result;
      console.log('My Details', this.employeeData)
    }
  }

  addPlan() {
    // this.data.location_name
    this.data.skills[0].point
  }
}
