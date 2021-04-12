import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/components/base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { CommunicationServiceProxy, EmailSetting } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';

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
    throw new Error('Method not implemented.');
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

  ngOnInit(): void {
  }
  showModal = false;

}
