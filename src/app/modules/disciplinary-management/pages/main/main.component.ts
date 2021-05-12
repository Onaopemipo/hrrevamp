import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateDisciplineTemplateServiceProxy, AddUpdateDisciplineTypeServiceProxy, CommunicationServiceProxy, DisciplinePayload,DisciplineRulesDTO,DisciplineTemplateDTO,FetchDisciplineTemplatesServiceProxy,GetAllDisciplineTypesServiceProxy, MailTemplateDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  disciplinetyupeForm: FormGroup;
  allDisciplineType: DisciplinePayload[] = [];
  allDisciplineTemplate: DisciplineTemplateDTO[] = [];
  DisciplinePayload = new DisciplinePayload().clone();
  selectedDiscipline = new DisciplinePayload().clone();
  selectedDisciplineRules: DisciplineRulesDTO[] = [];
  DisciplineTemplate = new DisciplineTemplateDTO().clone();
  loadingDisciplineType: boolean = false;
  showAddDisciplineTypeModal: boolean = false;
  loadingDisciplineTemplates: boolean = false;
  templates: MailTemplateDTO[] = [];
  templateFilter = {
    iD : undefined,
    disciplinaryTypeId: undefined,
    pageSize: undefined,
    pageNumber: undefined
  }
  constructor(private disciplineService: GetAllDisciplineTypesServiceProxy,
    private AddUpdateDisciplineTypeService: AddUpdateDisciplineTypeServiceProxy,
    private FetchDisciplineTemplatesService: FetchDisciplineTemplatesServiceProxy,
    private AddUpdateDisciplineTemplateService: AddUpdateDisciplineTemplateServiceProxy,
    private api: CommunicationServiceProxy,
  private alertService: AlertserviceService) { }

  get showEmptyDisciplineType() {
    return this.allDisciplineType.length === 0;
  }
  getTemplatesbyId(discipline, disciplinetypeId) {
    this.selectedDiscipline = discipline;
    this.templateFilter.disciplinaryTypeId = disciplinetypeId;
    this.selectedDisciplineRules = discipline.disciplineRules;
    this.loadingDisciplineTemplates = true;
    this.FetchDisciplineTemplatesService.fetchDisciplineTemplates(this.templateFilter.iD, this.templateFilter.disciplinaryTypeId, this.templateFilter.pageSize, this.templateFilter.pageNumber).subscribe(data => {
      if (!data.hasError) {
        this.loadingDisciplineTemplates = false;
        this.allDisciplineTemplate = data.result;
     }
     });
  }
  addDisciplineType() {
    this.loadingDisciplineType = true
    this.AddUpdateDisciplineTypeService.addUpdateDisciplinetypes(this.DisciplinePayload).subscribe(data => {
      this.loadingDisciplineType = false;
      if (!data.hasError) {
        this.DisciplinePayload = new DisciplinePayload().clone();
        this.showAddDisciplineTypeModal = false;
        this.getDisciplineType();
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    });
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
  updateCreatedisciplineTemplate() {
    this.loadingDisciplineTemplates = true;
    this.AddUpdateDisciplineTemplateService.addUpdateDisciplineTemplates(this.DisciplineTemplate).subscribe(data => {
      if (!data.hasError) {
      this.DisciplineTemplate = new DisciplineTemplateDTO().clone();
      this.loadingDisciplineTemplates = false;
      this.getTemplatesbyId(this.selectedDiscipline,this.templateFilter.disciplinaryTypeId);
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
  AddNewTemplate() {
    
  }
  ngOnInit(): void {
    this.getDisciplineType();
    this.getEmailTemplates();
  }

}
