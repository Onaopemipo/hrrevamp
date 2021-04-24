import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/components/base/base.component';
import { TopAction } from 'app/components/componentsheader/models';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { EmptyConfig } from 'app/components/page/page.component';
import { TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { CommunicationServiceProxy, EmailSetting } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyEmailSetting extends EmailSetting{}
@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent<MyEmailSetting, MyEmailSetting, MyEmailSetting> implements OnInit {
  filter: MyEmailSetting;
  data: MyEmailSetting[];
  getData(): Observable<ListResult<MyEmailSetting>> {
    return this.comm.getAllEmailSettings().pipe(map(res => {
      return {
        data: res.result.map(data => new MyEmailSetting(data)),
        length: res.totalRecord
      };
    }));
  }
  saveData(e: MyEmailSetting): Observable<any> {
    return this.comm.addUpdateEmailSetting(e);
  }
  getNewEditingData(): MyEmailSetting {
    return new MyEmailSetting();
  }
  successMessage: string;
  deleteData(data: MyEmailSetting): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor(
    private comm: CommunicationServiceProxy,
    protected alertService: AlertserviceService,
    protected confirmBox: ConfirmBoxService,
  ) {
    super(confirmBox);
  }

  emptyConfig: EmptyConfig = {
    pageHeader: 'No Email Settings',
    pageDescription: 'Create new email settings',
    buttonValue: 'Create New Settings'
  }
  showModal = false;
  tableActions: TableAction[] = [];
  formConfig: FormConfig = {
    fields: [
      {name: 'emailUserName', label: 'Username', type: FORM_TYPES.text, validator: {presence: true}},
      {name: 'emailHost', label: 'Host', type: FORM_TYPES.text, validator: {presence: true}},
      {name: 'emailPort', label: 'Port', type: FORM_TYPES.text, validator: {presence: true}},
      {name: 'emailFromAddress', label: 'Default mail address', type: FORM_TYPES.text, validator: {presence: true}},
      {name: 'emailPassword', label: 'Password', type: FORM_TYPES.text, validator: {presence: true}},
      {name: 'enableSSLForEmail', label: 'SSL', type: FORM_TYPES.checkbox, validator: {presence: true}},
      // {name: this.editingData.emailHost, label: 'Files', type: FORM_TYPES.checkbox},
      // {name: this.editingData.emailHost, label: 'Allow sending of mails', type: FORM_TYPES.text},
    ]
  };
  tableColumns: TableColumn[] = [
    {name: 'emailUserName', title: 'User Name'},
    {name: 'emailHost', title: 'Host'}
  ]
  tableActionClick(event: TableActionEvent<MyEmailSetting>) {}
  topActionButtons: TopAction[] = [
    {name: 'Add Setting', label: 'Add Setting', icon: 'plus'}
  ];

}
