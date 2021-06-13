import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateDisciplineTemplateServiceProxy,DeleteDisciplineTypesRulesServiceProxy, AddUpdateDisciplineTypeServiceProxy, AddUpdateDisciplineTypesRulesServiceProxy, CommunicationServiceProxy, DisciplinePayload,DisciplineRulesDTO,DisciplineTemplateDTO,FetchDisciplineTemplatesServiceProxy,GetAllDisciplineTypesServiceProxy, MailTemplateDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  pageName = "Disciplinary Settings";
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
  IsReward: boolean = false;
  constructor(private disciplineService: GetAllDisciplineTypesServiceProxy,
    private AddUpdateDisciplineTypeService: AddUpdateDisciplineTypeServiceProxy,
    private FetchDisciplineTemplatesService: FetchDisciplineTemplatesServiceProxy,
  private AddUpdateDisciplineTypesRulesService: AddUpdateDisciplineTypesRulesServiceProxy,
    private api: CommunicationServiceProxy, private DeleteDisciplineTypesRulesService: DeleteDisciplineTypesRulesServiceProxy,
    private alertService: AlertserviceService,
  private acitivatedroute: ActivatedRoute) { }

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
    this.showDetails = false;
    this.selectedDiscipline = discipline;
    this.templateFilter.disciplinaryTypeId = disciplinetypeId;
   this.selectedDisciplineRules = discipline.disciplineRules;
    this.loadingDisciplineTemplates = true;
    this.FetchDisciplineTemplatesService.fetchDisciplineTemplates(this.templateFilter.iD, this.templateFilter.disciplinaryTypeId,this.IsReward,0, this.templateFilter.pageSize, this.templateFilter.pageNumber).subscribe(data => {
      if (!data.hasError) {
        this.loadingDisciplineTemplates = false;
        this.allDisciplineTemplate = data.result;
     }
     });
  }
  addDisciplineType() {
    this.loadingDisciplineType = true
    this.DisciplinePayload.isReward = this.IsReward;
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
    this.disciplineService.fetchAllDisciplineTypes(this.IsReward).subscribe(data => {
      this.loadingDisciplineType = false;
      if (!data.hasError) {
        this.allDisciplineType = data.result;
    }
    });
  }
  updateCreatedisciplineRules() {
    this.loadingDisciplineRules = true;
    this.newDisciplineRules.disciplineTypeId = this.selectedDiscipline.id;
    this.AddUpdateDisciplineTypesRulesService.addUpdateDisciplineTypesRules(this.newDisciplineRules).subscribe(async data => {
      this.loadingDisciplineRules = false;
      if (!data.hasError) {     
        await this.getDisciplineType();
        this.selectedDiscipline = this.allDisciplineType.find(a => a.id == this.newDisciplineRules.disciplineTypeId);
        this.getTemplatesbyId(this.selectedDiscipline, this.newDisciplineRules.disciplineTypeId)
        this.newDisciplineRules = new DisciplineRulesDTO().clone();
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    })
  }
  deletedisciplineRules(id) {
    this.loadingDisciplineRules = true;
    this.DeleteDisciplineTypesRulesService.deleteDisciplineTypesRules(id).subscribe(async data => {
      this.loadingDisciplineRules = false;
      if (!data.hasError) {
        await this.getDisciplineType();
        this.selectedDiscipline = this.allDisciplineType.find(a => a.id == this.newDisciplineRules.disciplineTypeId);
        this.newDisciplineRules = new DisciplineRulesDTO().clone();
        this.getTemplatesbyId(this.selectedDiscipline,this.newDisciplineRules.disciplineTypeId)
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
    var newTemp = new DisciplineTemplateDTO().clone()
    newTemp.disciplineType = this.templateFilter.disciplinaryTypeId;    
    this.allDisciplineTemplate.push(newTemp);

    this.showDetails = true;
  }
  ngOnInit(): void {
    this.acitivatedroute.params.subscribe(data => {
  //    console.log(data);
      if (data.type) {
        var typ = data.type;
        this.IsReward = typ == "reward" ? true : false;
        this.pageName= typ == "reward" ? "Reward Settings" : "Disciplinary Settings";
      }
    });
    this.getDisciplineType();
    this.getEmailTemplates();
  }

}
