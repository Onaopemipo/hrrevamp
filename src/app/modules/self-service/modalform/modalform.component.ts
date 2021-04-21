import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ManageEventDTO, AddUpdateEventsServiceProxy, } from '../../../_services/service-proxies'
import { AlertserviceService } from '../../../_services/alertservice.service'
@Component({
  selector: 'ngx-modalform',
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.scss']
})
export class ModalformComponent implements OnInit {
  @Output() addEvent: EventEmitter<any> = new EventEmitter()
  submitbtnPressed: boolean = false;
  Event: ManageEventDTO = new ManageEventDTO().clone()
  EventForm: FormGroup;
  constructor(private AddEvents: AddUpdateEventsServiceProxy, private alertservice: AlertserviceService) { }

  ngOnInit(): void {
  }

  get validatestartdate() {
    if (this.Event.startDate) return true;
    return false;
  }
  get validateenddate() {
    if (this.Event.endDate) return true;
    return false;
  }

  get disableEvent() {
    let resp: boolean = true;

    let nullable = [
      "eventTypeId",
      "id",
      "notify_Employee",
    ]

    Object.entries(this.Event).map(([key, value], index) => {
      if ((value == "" || value == null || value == undefined) && nullable.indexOf(key) == -1) {
        resp = false;
      }
      // if (key == 'account_no' && !this.accountNumberValidate) resp = false;
    });
    console.log(this.Event)
    return resp;
  }

  async SubmitEvent(Event: ManageEventDTO) {
    this.submitbtnPressed = true
    const response = await this.AddEvents.addUpdateEvent(Event).toPromise()
    if (!response.hasError) {
      this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, response.message, 'OK');
      // console.log(response.result)
    }
    (error) => {

      if (error.status == 400) {
        this.alertservice.openCatchErrorModal(this.alertservice.ALERT_TYPES.FAILED, error.title, "Ok", error.errors);
      }
    }
    this.submitbtnPressed = false
    this.Event = null
  }

}
