import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExitRequestService, MyExitRequest } from '../services/exit-request.service';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'



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
  messageForm: FormGroup
  inputText: string = 'Attach';
  // creatingExit:MyExitRequest[]=[]
  order: boolean = false;
  success: boolean = false;
  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Cancel resignation', 'icon': 'plus', outline: true },

  ];
  ReasonForLeaving: string = ''
  subReason: string = ''
  SourceOfInitiation: string = ''
  DateOfExit = new Date();
  selectedOption: string = '1';
  FileUpload: Transfer[] = [];
  DocUpload: Transfer[] = []
  AdditionalComment: string = ''

  ExitRequest: MyExitRequest

  constructor(
    private router: Router,
    private api: ExitRequestService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.messageForm = this.formBuilder.group({
      ReasonForLeaving: ['', Validators.required],
      subReason: ['', Validators.required],
      SourceOfInitiation: ['', Validators.required],
      DateOfExit: ['', Validators.required],
      selectedOption: ['', Validators.required],
      FileUpload: ['', Validators.required],
      DocUpload: ['', Validators.required],
      AdditionalComment: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const a = params.a
      this.order = a
    }
    );
  }

  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.router.navigateByUrl('/employeemodule/exitmanagement');
    }

  }
  async onSubmit() {
    if (this.messageForm.invalid) {
      return
      //if it is invalid it should return nothing but if it is valid it should turn success to true
    }
    else {
      const InitializeExit: MyExitRequest = {
        reason: this.ReasonForLeaving,
        subReason: this.subReason,
        sourceOfInitiation: this.SourceOfInitiation,
        exitDate: this.DateOfExit,
        uploadUnsupportingDocument: this.FileUpload,
        comment: this.AdditionalComment
      }
      const res = await this.api.create(InitializeExit).toPromise();

    }


    if (this.order == false) {
      alert('Exit succesfully initiated')
      this.router.navigateByUrl('/employeemodule/exitmanagement');
    }
    if (this.order == true) {
      alert('Retirement succesfully initiated')
      this.router.navigateByUrl('/employeemodule/retirement')
    }

  }


}
