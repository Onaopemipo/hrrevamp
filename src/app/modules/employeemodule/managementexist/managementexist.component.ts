import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MyExitRequest } from '../services/exit-request.service';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { FormGroup } from '@angular/forms'
import { CommonServiceProxy, DataServiceProxy, RetirementServiceProxy, RetirementType, RetirmentDTO,IDTextViewModel, ManageRetirementDTO, UploadDocumentServiceProxy } from 'app/_services/service-proxies';
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
  exitForm: FormGroup;
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
  RetirmentBody = new ManageRetirementDTO().clone();
  uploadOption: number = 1;
  allbulkProcesses: IDTextViewModel[] = [];
  allowmultipleselection: boolean = true;
  selectionHeader = "Select Employee";
  addbtnText = "Add Employee";
  selectedEmployee = [];
  tempRef = "";
  files: Transfer;
  entityId = 0;
  Entity: IDTextViewModel[] = []
  constructor(
    private router: Router,
    private DataService: DataServiceProxy,
private CommonService: CommonServiceProxy,
    private activatedRoute: ActivatedRoute,
    private RetirementService: RetirementServiceProxy,
    private alertService: AlertserviceService,
    private CustomService: CustomServiceService,
    private UploadDocumentService: UploadDocumentServiceProxy,

  ) {

  }

  ngOnInit(): void {
    this.getEntity();
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
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
    var eChoice = this.RetirmentBody.exitChoice;
    this.RetirmentBody.exitChoice = eChoice == "1" ? "Forgo Salary" : "Spend 30 Days notice period";
    this.selectedEmployee.map(val => { val.dateCreated = new Date(); return val; });
    this.RetirmentBody.employeee = JSON.stringify(this.selectedEmployee);
    this.RetirementService.postRetireee(0, 1, this.RetirmentBody).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.alertService.openModalAlert(ALERT_TYPES.SUCCESS, data.message, "ok").subscribe(data => {
          this.RetirmentBody = new ManageRetirementDTO().clone();

        });
      }else {
        this.alertService.openModalAlert(ALERT_TYPES.FAILED, data.message, "Ok").subscribe(data => {

         });
      }
    }, (error) => {
      this.loading = false;
      if (error.status == 400) {
        this.alertService.openCatchErrorModal(ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
   })
  }
  getSelectedEmployee(event) {
    console.log(event)
    this.selectedEmployee = event;
  }
  modal(buttion) {
    if (buttion === TOP_ACTIONS.APPLY_FOR_LEAVE) {
     var rtPr= this.pageName == 'Retirement' ? "retirement" : "exit"
      this.router.navigateByUrl('/employeemodule/exitmanagement/'+rtPr);
    }

  }

  selectedFile(files: Transfer, title) {
    const refNumber =  this.tempRef
   console.log('temp ref', this.tempRef)
   if (this.Entity.length > 0) {
     let srchR = this.Entity.find(f => f.text == "RETIREMENT");
     this.entityId = srchR.id;
   }
   // this.files = files.flowFile.file
   this.UploadDocumentService.uploadDocs(0, title, 0, this.entityId, false, refNumber, files.flowFile.file[0])
     .subscribe(data => {
     if (!data.hasError) {
       console.log('ref',this.tempRef)
       console.log('datarseee', data.result)
       if (!data.hasError) {
         this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, 'OK');
        
       } else {
         this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, 'OK')
       }
     }
   });
 }
 async getEntity() {
  const data = await this.DataService.docEntityTypes().toPromise()
  if (!data.hasError) {
    this.Entity = data.result
    console.log('doc', this.Entity)
  }
  else {
    return data.hasError[0]
  }
}
}
