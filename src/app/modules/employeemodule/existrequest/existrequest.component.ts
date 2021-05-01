import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertserviceService, ALERT_TYPES } from 'app/_services/alertservice.service';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { RetirementServiceProxy, RetirmentDTO,FetchEmployeeByIdServiceProxy,EmployeeDTO,ManageRetirementDTO,RetirementType, CommonServiceProxy, DataServiceProxy, IDTextViewModel, UploadDocumentServiceProxy } from 'app/_services/service-proxies';
enum TOP_ACTIONS {
  SUBMIT_BUTTON,
  CANCEL_BUTTON
}
@Component({
  selector: 'ngx-existrequest',
  templateUrl: './existrequest.component.html',
  styleUrls: ['./existrequest.component.scss']
})
export class ExistrequestComponent implements OnInit {
  topActionButtons = [
    { name: TOP_ACTIONS.CANCEL_BUTTON, label: 'Cancel', 'icon': '', outline: true },
    { name: TOP_ACTIONS.SUBMIT_BUTTON, label: '', 'icon': '', outline: false },
   
  ];
  createNewEmployee: EmployeeDTO = new EmployeeDTO().clone();
  selectedOption: string = '';
  exitForm: FormGroup;
  RetirmentBody = new ManageRetirementDTO().clone();
  allRetirementType: RetirementType[] = [];
  filter = {
    ID: undefined,
    FullName: undefined,
    EmployeeId: undefined,
    DateRequested: undefined,
    Type: undefined,
    Status: undefined,
    IsCleared: undefined,
    retirmentTypeid: undefined,
    startdate: undefined,
    endate: undefined,
    PageSize: 10,
    PageNumber: 1
  }
  allExitRequest: RetirmentDTO[] = [];
  jobName: string = '';
  departmentName: string = '';
  loading: boolean = false;
  modificationStatus: boolean = false;
  tempRef = "";
  files: Transfer;
  entityId = 0;
  Entity: IDTextViewModel[] = [];
  userExit = "";
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private CommonService: CommonServiceProxy,
    private RetirementService: RetirementServiceProxy,private alertService: AlertserviceService,
    private FetchEmployeeByIdService: FetchEmployeeByIdServiceProxy, private DataService: DataServiceProxy,
    private UploadDocumentService: UploadDocumentServiceProxy,) { }
  getEmployeeDetails(employeeId) {
    this.FetchEmployeeByIdService.getEmployeeById(employeeId).subscribe((data) => {
      if (!data.hasError) {
        this.createNewEmployee = data.result;
        this.jobName = this.createNewEmployee.contracts.length > 0 ? this.createNewEmployee.contracts[0].jobName : "";
        this.departmentName = this.createNewEmployee.contracts.length > 0 ? this.createNewEmployee.contracts[0].departmentName : "";
        console.log(this.createNewEmployee);        
      }
    });
  }
  getRetirementDetails(employeeId,exitUser) {
    this.filter.EmployeeId = employeeId
    this.RetirementService.getRetirees(this.filter.ID, this.filter.FullName,this.filter.EmployeeId,this.filter.DateRequested,this.filter.Type,this.filter.Status,this.filter.IsCleared,this.filter.retirmentTypeid,this.filter.startdate,this.filter.endate,this.filter.PageSize,this.filter.PageNumber)
    .subscribe(data => {
      if (!data.hasError) {
        this.allExitRequest = data.result;
        if (this.allExitRequest.length < 1) {
          this.modificationStatus = false;
          this.topActionButtons[1].label = "Submit";
        } else {
          this.RetirmentBody.id = this.allExitRequest[0].id;
          this.RetirmentBody.retirementTypeId = this.allExitRequest[0].retirementTypeId;
          this.RetirmentBody.subReason = this.allExitRequest[0].subReason;
          this.RetirmentBody.sourceofInitiation = this.allExitRequest[0].sourceofInitiation;
          this.RetirmentBody.personalPhoneNumber = this.allExitRequest[0].personalPhoneNumber;
          this.RetirmentBody.personalEmail = this.allExitRequest[0].personalEmail;
          this.RetirmentBody.exitChoice = this.allExitRequest[0].exitChoice;
          this.RetirmentBody.exitDate = this.allExitRequest[0].exitDate;          
          this.modificationStatus = true;
          this.topActionButtons[1].label = "Update Changes";
        }
    }
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
    this.createNewEmployee.dateCreated = new Date();
    this.RetirmentBody.employeee = JSON.stringify(this.createNewEmployee);
    this.RetirmentBody.tempref = this.tempRef;
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
  ngOnInit(): void {
    this.getEntity();
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
     this.getRetirementsTypes();
    this.createNewEmployee.contracts = [];
    this.activatedRoute.queryParams.subscribe(data => {
      if (data) {
        if (data.employeeId) {
          var exitU = data.exitUser ? data.exitUser : "";
          this.userExit = exitU;
          this.getRetirementDetails(data.employeeId, exitU);
          this.getEmployeeDetails(data.employeeId);
        } else {
          
       }
     }
   })
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
 // checked = false;
 modal(buttion) {
  if (buttion === TOP_ACTIONS.SUBMIT_BUTTON) {

  }
  if (buttion === TOP_ACTIONS.CANCEL_BUTTON) {
    if (this.userExit == "User") {
    this.router.navigate(['/self-service/dashboard'])
    } else {
      this.router.navigate(['/employeemodule/exitmanagement/retirement'])
    }
  }
}
  toggle(checked: boolean) {
   // this.checked = checked;
  }
  gotoNextPage(is_approved = []) {
    // let tabtittle = "";
    // var activePos = is_approved.findIndex(x => x.activeValue);
    // var tabset = document.get('tabset')
    // tabset.tabs._results[]
    // is_approved.forEach(value => {
    //   if (value.activeValue) tabtittle = value.tabTitle;
    // });
    // console.log(tabtittle);
    
  }
  gohome() {
    this.router.navigateByUrl('/');
  }
}

