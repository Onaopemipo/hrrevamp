import { Component, OnInit } from '@angular/core';
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

  constructor(
    private api: CommunicationServiceProxy,
  ) { }

  editingData: MailTemplateDTO = new MailTemplateDTO();
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
    const data = await this.api.addUpdateEmailTemplate(this.editingData).toPromise();
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
    this.showCreateModal = true;
  }

}
