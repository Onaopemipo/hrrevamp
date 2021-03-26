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

  constructor(private navCtrl: Location,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService) { }

  async ngOnInit() {
    let subscription: Subscription = null;
    subscription = this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      // subscription.unsubscribe();
      this.employeeService.fetch(id).toPromise().then(response => {
        this.data = response;
      })
    });
  }

  goback() {
    this.navCtrl.back();
  }

  addPlan() {
   // this.data.location_name
    //this.data.certification[0].
  }
}
