import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MyExitRequest } from '../services/exit-request.service';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { FormGroup } from '@angular/forms'
import { CommonServiceProxy, DataServiceProxy, RetirementServiceProxy, RetirementType, RetirmentDTO,IDTextViewModel } from 'app/_services/service-proxies';
import { AlertserviceService, ALERT_TYPES } from 'app/_services/alertservice.service';
import { CustomServiceService } from 'app/_services/custom-service.service';



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
  pageName: string = '';
  exitForm: FormGroup
  inputText: string = 'Attach';
  // creatingExit:MyExitRequest[]=[]
  order: boolean = false;
  success: boolean = false;
  topActionButtons = [
    { name: TOP_ACTIONS.APPLY_FOR_LEAVE, label: 'Cancel Request', 'icon': 'plus', outline: true },

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
  allRetirementType: RetirementType[] = [];
  loading: boolean = false;
  RetirmentBody = new RetirmentDTO().clone();
  uploadOption: number = 1;
  allbulkProcesses: IDTextViewModel[] = [];
  constructor(
    private router: Router,
    private DataService: DataServiceProxy,
private CommonService: CommonServiceProxy,
    private activatedRoute: ActivatedRoute,
    private RetirementService: RetirementServiceProxy,
    private alertService: AlertserviceService,
    private CustomService: CustomServiceService,

  ) {

  }

  ngOnInit(): void {
    this.getRetirementsTypes();
this.getProccessId()
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        if (params.type) {
          let pnam = params.type;
          this.pageName = pnam == 'Retirement' ? "Retirement" : "Exit Management"
 
        }
      }
    }
    );
  }
  getProccessId() {
    this.DataService.getBulkUploadProcesses().subscribe(data => {
      if (!data.hasError) {
        this.allbulkProcesses = data.result;
      }
    })
  }
  downloadSampleFile() {
    let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
    this.CustomService.downloadSampleTemplate(processId).subscribe((data) => {
      const dtype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      this.CustomService.downloadFile(data, dtype);

    })
  }
  getRetirementsTypes() {
    this.CommonService.getRetirmentType().subscribe(data => {
      if (!data.hasError) {
        this.allRetirementType = data.result;
     }
  })
  }
  submitRetirement() {
    this.loading = true;
    // this.RetirementService.postRetireee(1, 0, this.RetirmentBody).subscribe(data => {
    //   this.loading = false;
    //   if (!data.hasError) {
    //     this.alertService.openModalAlert(ALERT_TYPES.SUCCESS, data.message, "ok").subscribe(data => {
    //       this.RetirmentBody = new RetirmentDTO().clone();
       
    //     });
    //   }else {
    //     this.alertService.openModalAlert(ALERT_TYPES.FAILED, data.message, "Ok").subscribe(data => {
 
    //      });
    //   }
    // }, (error) => {
    //   this.loading = false;
    //   if (error.status == 400) {
    //     this.alertService.openCatchErrorModal(ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
    //   }
   // })
  }
  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
      this.router.navigateByUrl('/employeemodule/exitmanagement');
    }

  }



}
