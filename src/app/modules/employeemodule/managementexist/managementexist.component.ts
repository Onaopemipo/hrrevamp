import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExitRequestService, MyExitRequest } from '../services/exit-request.service';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


enum TOP_ACTIONS {
  APPLY_FOR_LEAVE,
  INITIATE_VOLUNTARY_EXIT
}


@Component({
  selector: 'ngx-managementexist',
  templateUrl: './managementexist.component.html',
  styleUrls: ['./managementexist.component.scss']
})
export class ManagementexistComponent implements OnInit {
  ExitManagement: string = 'Exit Management';
  // creatingExit:MyExitRequest[]=[]
 
  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Cancel resignation', 'icon': 'plus', outline: true },

  ];
  ReasonForLeaving: string=''
  SubReason: string=''
  SourceOfInitiation: string=''
  DateOfExit = new Date();
  selectedOption: string = '1';
  FileUpload: Transfer[]=[];
  DocUpload: Transfer[]=[]
  AdditionalComment:string=''

  constructor(
    private router: Router,
    private api: ExitRequestService,
  ) { }

  ngOnInit(): void {
  }

  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.router.navigateByUrl('/employeemodule/exitmanagement');
    }

  }
  async onSubmit(){
    const InitializeExit: MyExitRequest ={
     reason: this.ReasonForLeaving,
     subReason: this.SubReason,
     sourceOfInitiation: this.SourceOfInitiation,
     exitDate: this.DateOfExit,
     uploadUnsupportingDocument: this.FileUpload,
     comment: this.AdditionalComment
    }
    const res = await this.api.create(InitializeExit).toPromise();
    alert('Exit succesfully initiated')
    this.router.navigateByUrl('/employeemodule/exitmanagement');
  }
}
