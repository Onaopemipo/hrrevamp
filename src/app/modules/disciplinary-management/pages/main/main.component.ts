import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateDisciplineTemplateServiceProxy, AddUpdateDisciplineTypeServiceProxy, AddUpdateDisciplineTypesRulesServiceProxy, CommunicationServiceProxy, DisciplinePayload,DisciplineRulesDTO,DisciplineTemplateDTO,FetchDisciplineTemplatesServiceProxy,GetAllDisciplineTypesServiceProxy, MailTemplateDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  disciplinetyupeForm: FormGroup;
  disciplineRuleForm:FormGroup;
  allDisciplineType: DisciplinePayload[] = [];
  allDisciplineTemplate: DisciplineTemplateDTO[] = [];
  DisciplinePayload = new DisciplinePayload().clone();
  selectedDiscipline = new DisciplinePayload().clone();
  newDisciplineRules = new DisciplineRulesDTO().clone();
  selectedDisciplineRules: DisciplineRulesDTO[] = [];
  DisciplineTemplate = new DisciplineTemplateDTO().clone();
  loadingDisciplineType: boolean = false;
  showAddDisciplineTypeModal: boolean = false;
  loadingDisciplineTemplates: boolean = false;
  loadingDisciplineRules: boolean = false;
  templates: MailTemplateDTO[] = [];
  templateFilter = {
    iD : undefined,
    disciplinaryTypeId: undefined,
    pageSize: undefined,
    pageNumber: undefined
  }
  showDetails = false;

  constructor(private disciplineService: GetAllDisciplineTypesServiceProxy,
    private AddUpdateDisciplineTypeService: AddUpdateDisciplineTypeServiceProxy,
    private FetchDisciplineTemplatesService: FetchDisciplineTemplatesServiceProxy,
  private AddUpdateDisciplineTypesRulesService: AddUpdateDisciplineTypesRulesServiceProxy,
    private api: CommunicationServiceProxy,
  private alertService: AlertserviceService) { }

  get showEmptyDisciplineType() {
    return this.allDisciplineType.length === 0;
  }
  handleTemplateSubmit(event) {
    if (event) {
      var discipline = this.allDisciplineType.find(x => x.id == event);
      this.getTemplatesbyId(discipline, event);
    }
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
  updateCreatedisciplineRules() {
    this.loadingDisciplineRules = true;
    this.AddUpdateDisciplineTypesRulesService.addUpdateDisciplineTypesRules(this.newDisciplineRules).subscribe(data => {
      this.loadingDisciplineRules = false;
      if (!data.hasError) {
        this.newDisciplineRules = new DisciplineRulesDTO().clone();
        this.getDisciplineType();
        this.getTemplatesbyId(this.selectedDiscipline,this.newDisciplineRules.disciplineTypeId)
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    })
  }
 async getEmailTemplates() {
    const res =  await this.api.getAllEmailTemplates().toPromise();
    this.templates = res.result;
  }
  AddNewTemplate() {
    var newTemp = new DisciplineTemplateDTO().clone()
    newTemp.disciplineType = this.templateFilter.disciplinaryTypeId;    
    this.allDisciplineTemplate.push(newTemp);

    this.showDetails = true;
  }
  ngOnInit(): void {
    this.getDisciplineType();
    this.getEmailTemplates();
  }

}
