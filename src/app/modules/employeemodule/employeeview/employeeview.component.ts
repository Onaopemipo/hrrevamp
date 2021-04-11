import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDTOApiResult, EmployeeDTO,VwConfirmationDTO } from '../../../_services/service-proxies';
import { SaveConfirmationServiceProxy, FetchEmployeeByIdServiceProxy, } from '../../../_services/service-proxies';




enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  ADD_PLAN
}

@Component({
  selector: 'ngx-employeeview',
  templateUrl: './employeeview.component.html',
  styleUrls: ['./employeeview.component.scss']
})
export class EmployeeviewComponent implements OnInit {
  employee: EmployeeDTO = new EmployeeDTO(); 
  mgr_feedback: string = '';
  mgr_advice: string = '';
  body = {
    mgr_feedback: this.mgr_feedback,
    mgr_advice: this.mgr_feedback
  }


  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Add', 'icon': 'plus', outline: true },

  ];

  tableColumns = [
    { name: '', title: ' Qualification Name' },
    { name: '', title: 'Qualification Type' },
    { name: '', title: 'Course Name' },
    { name: '', title: 'Institution' },
    { name: '', title: 'Start Date' },
    { name: '', title: 'End Date' },
  ];
  selectedCase: string = 'personal_Info';
  selectedPanel: any = { title: 'personal_Info', label: 'Personal Information', status: 'Active' };
  employeeviewlist = [
    { title: 'personal_Info', label: 'Personal Information', status: 'Active', iconname: 'person' },
    { title: 'confrimation_info', label: 'Confirmation Information', status: 'Inactive', iconname: 'inbox' },
    { title: 'approval_log', label: 'Approval Log', status: 'Inactive', iconname: 'file-text' },

  ];
  constructor(private activatedRoute: ActivatedRoute,
    private FetchEmployeeByIdServiceProx: FetchEmployeeByIdServiceProxy,
    private SaveConfirmation:SaveConfirmationServiceProxy ) { }
  selectPanel(hiringlist, i) {
    this.selectedPanel = hiringlist;

    this.employeeviewlist.forEach(value => {
      value.status = 'Inactive';
    });
    this.employeeviewlist[i].status = 'Active';
    this.selectedCase = this.employeeviewlist[i].title;
  }

  ngOnInit(): void {
  
    this.activatedRoute.queryParams.subscribe(data => {
      if (data.data) {
        let confInfo = data.data; 
        this.FetchEmployeeByIdServiceProx.getEmployeeById(confInfo.employee_id).toPromise().then(
          a => this.employee = a.result
         )
      } 

    }
    );
  }
  onSubmit(body:VwConfirmationDTO) {
    this.SaveConfirmation.saveConfirmation(body).toPromise().then(
      feedback => alert(feedback)
    )
  }

  modal(buttion) {
    // if (buttion === TOP_ACTIONS.ADD_LEAVE_TYPE) {
    // this.showLeaveTypeModal = true

    // }

  }
  data=[
    { name: '', title: ' Qualification Name' },
    { name: '', title: 'Qualification Type' },
    { name: '', title: 'Course Name' },
    { name: '', title: 'Institution' },
    { name: '', title: 'Start Date' },
    { name: '', title: 'End Date' },
   ,
  ]

}





