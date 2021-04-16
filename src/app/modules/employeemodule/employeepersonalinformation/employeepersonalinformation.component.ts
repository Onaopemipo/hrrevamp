import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  PostServiceProxy, MessageOut, OnboardingPersonalDTO,
  OnboardingWorkDTO, CommonServiceProxy, DropdownValue, StateIListApiResult, State
} from '../../../_services/service-proxies';

import { AlertserviceService } from 'app/_services/alertservice.service';
import { DataServiceProxy } from '../../../_services/service-proxies'
import { from } from 'rxjs';

@Component({
  selector: 'ngx-employeepersonalinformation',
  templateUrl: './employeepersonalinformation.component.html',
  styleUrls: ['./employeepersonalinformation.component.scss']
})
export class EmployeepersonalinformationComponent implements OnInit {
  title: string = 'Employee Profile';
  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  hiringChecklist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active' },
    { title: 'work_Info', label: 'Work Information', status: 'Inactive' },
    { title: 'payment_Info', label: 'Payment', status: 'Inactive' },
    { title: 'medical_Info', label: 'Medical Disclosure', status: 'Inactive' },
    { title: 'tax_Info', label: 'Tax', status: 'Inactive' },
    { title: 'document_Info', label: 'Documents', status: 'Inactive' },

  ];
  AdminForm:FormGroup
  InformationData = new OnboardingPersonalDTO().clone();
  allGender: DropdownValue[] = [];

  constructor(private DataService : DataServiceProxy) { }
  async getGender() {
    const data = await this.DataService.getDropDownValuesById(10).toPromise()
    if (!data.hasError) {

      this.allGender = data.result;
      this.allGender[0].option_text
    }
  }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.hiringChecklist.forEach(value => {
      value.status = 'Inactive';
    });
    this.hiringChecklist[i].status = 'Active';
    this.selectedCase = this.hiringChecklist[i].title;
  }

  ngOnInit(): void {
  }

}
