import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CommunicationServiceProxy, IDTextViewModel, MailTemplateDTO } from 'app/_services/service-proxies';

enum TOP_ACTIONS {
  createNew
}
@Component({
  selector: 'ngx-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  templateName = "";
  loadingSubmit = false;
  constructor(
    private alertService: AlertserviceService,
    private api: CommunicationServiceProxy,
  ) { }

  editingData: MailTemplateDTO = new MailTemplateDTO().clone();
  templates: MailTemplateDTO[] = [];
  async loadData() {
    this.loading = true;
    const res =  await this.api.getAllEmailTemplates().toPromise();
    this.templates = res.result;
    this.loading = false;
  }
  ngOnInit(): void {
    this.loadData();
    this.loadTemplateTypes();
  }
  templateTypes: IDTextViewModel[] = [];
  async loadTemplateTypes(){
    const res = await this.api.getAllTemplateTypes().toPromise();
    this.templateTypes = res.result;
  }
  async createTemplate() {
    this.loadingSubmit = true;
    const data = await this.api.addUpdateEmailTemplate(this.editingData).toPromise();
    if (!data.hasError) {
      this.loadingSubmit = false;
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
    } else {
      this.loadingSubmit = false;
      this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
    }
  }

  rbutton = [
    { name: TOP_ACTIONS.createNew, label: 'Create template', icon: 'plus', outline: false },
    // { name: 'Add New',icon: 'plus',outline: false },
  ];

  loading = false;
  showCreateModal = false;
  pageActionClicked(actionName) {
    this.showCreateModal = true;
  }

  editTemplate(template){
    this.editingData = template;
    this.templateName = this.editingData.subject;
    this.showCreateModal = true;
  }

}
