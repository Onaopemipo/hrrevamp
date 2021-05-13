import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Grade,Location,MailTemplateDTO,DisciplinePayload, CommunicationServiceProxy, DisciplineTemplateDTO, GetAllDisciplineTypesServiceProxy, CommonServiceProxy, DataServiceProxy, IDTextViewModel, UploadDocumentServiceProxy, AddUpdateDisciplineTemplateServiceProxy, DeleteDisciplineTemplatesServiceProxy } from 'app/_services/service-proxies';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { AlertserviceService } from 'app/_services/alertservice.service';

@Component({
  selector: 'ngx-discipline-edit',
  templateUrl: './discipline-edit.component.html',
  styleUrls: ['./discipline-edit.component.scss']
})
export class DisciplineEditComponent implements OnInit {
  newDisciplineTemplateForm: FormGroup;
  @Input() DisciplineTemplate = new DisciplineTemplateDTO().clone();
  @Input() showDetails: boolean = false;
  _createNew = false;
  @Input() set createNew(val: boolean) {
    this._createNew = val;
    this.classes = {
      'card' : !val,
      'main-page-container': !val,
      'create': val
    };
    if(val){
      this.showDetails = true;
    }
  }
  @Output() TemplateSubmitted = new EventEmitter<any>();

  get createNew() {
    return this._createNew;
  }
  allDisciplineType: DisciplinePayload[] = [];
  templates: MailTemplateDTO[] = [];
  loadingDisciplineType: boolean = false;
  alllocations: Location[] = [];
  allgrades: Grade[] = [];
  tempRef = "";
  files: Transfer;
  entityId = 0;
  Entity: IDTextViewModel[] = []
  loadingDisciplineTemplates = false;
  constructor(private CommonService: CommonServiceProxy,private DataService: DataServiceProxy,
    private api: CommunicationServiceProxy, private disciplineService: GetAllDisciplineTypesServiceProxy,
    private UploadDocumentService: UploadDocumentServiceProxy, private alertService: AlertserviceService,
    private AddUpdateDisciplineTemplateService: AddUpdateDisciplineTemplateServiceProxy,
    private DeleteDisciplineTemplatesService: DeleteDisciplineTemplatesServiceProxy
  ) { }
  deleteTemplate(disciplineId) {
    this.loadingDisciplineTemplates = true;
    this.DeleteDisciplineTemplatesService.deleteDisciplineTemplates(disciplineId).subscribe(data => {
      this.loadingDisciplineTemplates = false;
      if (!data.hasError) {
        this.DisciplineTemplate = new DisciplineTemplateDTO().clone();
         
          this.TemplateSubmitted.emit(this.DisciplineTemplate.disciplineType);
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    })
  }
  updateCreatedisciplineTemplate() {
    this.loadingDisciplineTemplates = true;
    this.AddUpdateDisciplineTemplateService.addUpdateDisciplineTemplates(this.DisciplineTemplate).subscribe(data => {
      this.loadingDisciplineTemplates = false;
      if (!data.hasError) {
      this.DisciplineTemplate = new DisciplineTemplateDTO().clone();
       
        this.TemplateSubmitted.emit(this.DisciplineTemplate.disciplineType);
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
    } else {
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
    }
     });
  }
  async getEmailTemplates() {
    const res =  await this.api.getAllEmailTemplates().toPromise();
    this.templates = res.result;
  }
  getDisciplineType() {
    this.loadingDisciplineType = true
    this.disciplineService.fetchAllDisciplineTypes().subscribe(data => {
      this.loadingDisciplineType = false;
      if (!data.hasError) {
        this.allDisciplineType = data.result;
    }
    });
  }
  getalllocations() {
    this.CommonService.getLocations().subscribe(data => {
      if (!data.hasError) {
        this.alllocations = data.result;
      }else{}
      
    })
  }
  getallGrade() {
    this.CommonService.getGrades().subscribe(data => {
      if (!data.hasError) {
        this.allgrades = data.result;
      }else{}
      
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
     let srchR = this.Entity.find(f => f.text == "OTHERS");
     this.entityId = srchR.id;
   }
   // this.files = files.flowFile.file
   this.UploadDocumentService.uploadDocs(0, title, 0, this.entityId, false, refNumber, files.flowFile.file[0])
     .subscribe(data => {
       if (!data.hasError) {
         this.DisciplineTemplate.tempref = this.tempRef;
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
  ngOnInit(): void {
    this.getEntity();
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.getDisciplineType();
    this.getEmailTemplates();
    this.getalllocations();
    this.getallGrade();
  }

  classes = {
    'card' : !this.createNew,
    'main-page-container': !this.createNew,
    create: this.createNew
  };

  showDetail() {
    this.showDetails = true;
  }
}
