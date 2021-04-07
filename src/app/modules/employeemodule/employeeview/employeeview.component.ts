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
    { name: 'employee.qualifications[0].name', title: ' Qualification Name' },
    { name: 'employee.qualifications[0].type', title: 'Qualification Type' },
    { name: 'employee.qualifications[0].courseName', title: 'Course Name' },
    { name: 'employee.qualifications[0].institution', title: 'Institution' },
    { name: 'employee.qualifications[0].startDate', title: 'Start Date' },
    { name: 'employee.qualifications[0].endDate', title: 'End Date' },
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
  
    this.activatedRoute.paramMap.subscribe(params => {
      const employee_id= params.get('employee_id');
       const id = Number(employee_id)
      console.log(id)
       this.FetchEmployeeByIdServiceProx.getEmployeeById(id).toPromise().then(
        a => this.employee = a.result
       )

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
    { name: 'employee.qualifications[0].name', title: ' Qualification Name' },
    { name: 'employee.qualifications[0].type', title: 'Qualification Type' },
    { name: 'employee.qualifications[0].courseName', title: 'Course Name' },
    { name: 'employee.qualifications[0].institution', title: 'Institution' },
    { name: 'employee.qualifications[0].startDate', title: 'Start Date' },
    { name: 'employee.qualifications[0].endDate', title: 'End Date' },
   ,
  ]

}





