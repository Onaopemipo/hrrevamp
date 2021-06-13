import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from '@flowjs/ngx-flow';
import { AlertserviceService } from 'app/_services/alertservice.service';
import {
  AddUpdateDisciplineManagementServiceProxy, DataServiceProxy,
  DisciplineManagementDTO, DisciplinePayload, DisciplineTemplateDTO,
  FetchDisciplineTemplatesServiceProxy, GetAllDisciplineTypesServiceProxy,
  IDTextViewModel, UploadDocumentServiceProxy
} from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  newDisciplineTemplateForm: FormGroup;
  pageName = "New Discipline";
  allowmultipleselection: boolean = true;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  IsReward: boolean = false;

  loadingDisciplineType: boolean = false;
  allDisciplineType: DisciplinePayload[] = [];
  allDisciplineTemplate: DisciplineTemplateDTO[] = [];
  loadingDisciplineTemplates: boolean = false;
  templateFilter = {
    iD : undefined,
    disciplinaryTypeId: undefined,
    pageSize: undefined,
    pageNumber: undefined
  }
  selectedRecipient = [];
  selectedCc = [];
  tempRef = "";
  files: Transfer;
  entityId = 0;
  Entity: IDTextViewModel[] = [];
  loadingDiscipline: boolean = false;
  DisciplineManagement = new DisciplineManagementDTO().clone();
  constructor(private acitivatedroute: ActivatedRoute, private router: Router,
    private disciplineService: GetAllDisciplineTypesServiceProxy,
    private FetchDisciplineTemplatesService: FetchDisciplineTemplatesServiceProxy,
    private alertService: AlertserviceService, private DataService: DataServiceProxy,
    private UploadDocumentService: UploadDocumentServiceProxy,
  private AddUpdateDisciplineManagementService:AddUpdateDisciplineManagementServiceProxy) { }


  getDisciplineType() {
    this.loadingDisciplineType = true
    this.disciplineService.fetchAllDisciplineTypes(this.IsReward).subscribe(data => {
      this.loadingDisciplineType = false;
      if (!data.hasError) {
        this.allDisciplineType = data.result;
    }
    });
  }
  getTemplatesbyId(disciplinetypeId) {
    this.templateFilter.disciplinaryTypeId = disciplinetypeId;
    this.loadingDisciplineTemplates = true;
    this.FetchDisciplineTemplatesService.fetchDisciplineTemplates(this.templateFilter.iD, this.templateFilter.disciplinaryTypeId,this.IsReward,0, this.templateFilter.pageSize, this.templateFilter.pageNumber).subscribe(data => {
      if (!data.hasError) {
        this.loadingDisciplineTemplates = false;
        this.allDisciplineTemplate = data.result;
     }
     });
  }
  discard() {
    var param = this.IsReward ? "reward" : "discipline";
    this.router.navigate(['/discipline/log/' + param]);
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
     let srchR = this.Entity.find(f => f.text == "OTHERS");
     this.entityId = srchR.id;
   }
   // this.files = files.flowFile.file
  //  console.log(files.flowFile.file)
    var fileParam = [];
    let fileObj = {
      data: files.flowFile.file,
      fileName: "Discipline/Reward"
    }
    fileParam.push(fileObj)
   this.UploadDocumentService.uploadDocs(0, title, 0, this.entityId, false, refNumber, fileParam)
     .subscribe(data => {
       if (!data.hasError) {
         this.DisciplineManagement.tempRef = this.tempRef;
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
  createMgtLog() {
    if (this.selectedRecipient.length > 0) {
      this.loadingDiscipline = true;
      this.selectedRecipient.map(s => { s.dateCreated = new Date; return s; })
      this.selectedCc.map(s => { s.dateCreated = new Date; return s;} )
      this.DisciplineManagement.recipientsEmployee = JSON.stringify(this.selectedRecipient);
      this.DisciplineManagement.carbonCopyEmployee = JSON.stringify(this.selectedCc);
      this.DisciplineManagement.isReward = this.IsReward;
      this.AddUpdateDisciplineManagementService.addUpdateDisciplineManagement(this.DisciplineManagement).subscribe(data => {
        this.loadingDiscipline = false;
        if (!data.hasError) {
          this.DisciplineManagement = new DisciplineManagementDTO().clone();

          this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
        } else {
          this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
        }
      })
    } else {
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, "Please select Recipient", "ok");
    }

  }
  ngOnInit(): void {
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.acitivatedroute.params.subscribe(data => {
      //    console.log(data);
          if (data.type) {
            var typ = data.type;
            this.IsReward = typ == "reward" ? true : false;
            this.pageName= typ == "reward" ? "New Reward" : "New Discipline";
          }
    });
    this.getDisciplineType();
    this.getEntity();
  }
    getSelectedEmployee(event,selectType) {
     console.log(event)
      if(selectType == 'recipient'){this.selectedRecipient = event}
      if (selectType == 'cc') {this.selectedCc = event}

      //console.log(selectType, event)
   }


}
