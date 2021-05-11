import { Injectable, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { MessageOutApiResult } from './service-proxies';

export enum ALERT_TYPES {
  SUCCESS = 'success',
  FAILED = 'danger',
  COPIED = 'copied',
  CONFIRM = 'confirm',
  ANYCONFIRM="anyconfirm"
}
@Component({
  selector: 'ngx-alertModalComponent',
  template: `
  <nb-card>
  <nb-card-body>

   <div style="display:flex;flex-direction: column;padding:5rem;align-items:center; text-align:center">
   <img src="assets/icons/success.jpg" style="width:10rem" *ngIf="alertType == 'success'">
   <img src="assets/icons/failure.jpg" style="width:10rem" *ngIf="alertType == 'danger'">
   <img src="assets/icons/copied.jpg" style="width:10rem" *ngIf="alertType == 'copied'">
   <img src="assets/icons/rejected.jpg" style="width:10rem" *ngIf="alertType == 'confirm'">
   <div style="padding:10px">
   <span class="header4-bold" *ngIf="alertType == ALERT_TYPES.SUCCESS">Success!</span>
   <span class="header4-bold" *ngIf="alertType == ALERT_TYPES.FAILED">Failed!</span>
   <span class="header4-bold" *ngIf="alertType == ALERT_TYPES.COPIED">Copied!</span>
   <span class="header4-bold" *ngIf="alertType == ALERT_TYPES.CONFIRM">Confirmation</span>
   <span class="header4-bold" *ngIf="alertType == ALERT_TYPES.ANYCONFIRM">Confirmation</span>
   </div>
   <div style="padding:10px">
   <span *ngIf="alertType != ALERT_TYPES.CONFIRM"  class="listsubheader">{{alertMessage}}!</span>
   <span *ngIf="alertType == ALERT_TYPES.CONFIRM"  class="listsubheader">Please confirm you want to delete {{alertMessage}}!</span>
<div *ngIf="catchErrorAlert" style="display:flex;flex-direction: column; padding: 10px 0 0 0">
<span *ngFor="let err of alerterrors" style="color:red"> * {{err}}</span>
</div>

   </div>

   <div style="padding:10px;display:flex;flex-direction:row" >

 <div >
 <button nbButton type="button" (click)="submit()"
 style="background-color: #4847E0;
 border-color: #4847E0;
 color: #ffffff;"
 >{{alertButtonMessage}}</button>
 </div>

 <div  *ngIf="alertType == ALERT_TYPES.CONFIRM || alertType == ALERT_TYPES.ANYCONFIRM" style="padding-left:10px">
   <button nbButton  type="button" (click)="cancel()"
   style="background-color: #EB57571A;
   border-color: #EB57571A;
   color:#EB5757;"
   >No</button>
   </div>
   </div>

   </div>
  </nb-card-body>

</nb-card>
  `,
  styleUrls: ['../components/alertModal.scss']
})
export class alertmodalComponent implements OnInit {
  ALERT_TYPES = ALERT_TYPES;
  alertType: string = '';
  alertMessage: string = '';
  alertButtonMessage: string = '';
  catchErrorAlert: boolean = false;
  alerterrors = [];
  constructor(protected ref: NbDialogRef<alertmodalComponent>, private alertController: AlertserviceService ) {}
  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close('closed');
  }

  ngOnInit(): void {
    this.alertType = this.alertController.alertType;
    this.alertMessage = this.alertController.alertMessage;
    this.alertButtonMessage = this.alertController.alertButtonMessage;
    this.catchErrorAlert = this.alertController.catchErrorAlert;
    var initialerr = this.alertController.alerterrors;
    if (initialerr) {
      Object.entries(initialerr).forEach(([key, value], index) => {
        this.alerterrors.push(value[0])
      })

    }

  }
}

@Injectable({
  providedIn: 'root'
})
export class AlertserviceService {
  names: string[] = [];

  alertType: string = '';
  alertMessage: string = '';
  alertButtonMessage: string = '';
  ALERT_TYPES = ALERT_TYPES;
  catchErrorAlert: boolean = false;
  alerterrors: Array<any>[] = [];
  constructor(private dialogService: NbDialogService) { }

  showResponseMessage(res: MessageOutApiResult){
    return this.openModalAlert(res.hasError ? this.ALERT_TYPES.FAILED : this.ALERT_TYPES.SUCCESS, res.message, 'Okay');
  }

  openModalAlert(alertType, alertMessage, alertButtonMessage): Observable<any> {
    this.alertType = alertType;
    this.alertMessage = alertMessage;
    this.alertButtonMessage = alertButtonMessage;
    const newSubjectResponse = new Subject();
    this.dialogService.open(alertmodalComponent,
      {
       closeOnEsc: false
      })
      .onClose.subscribe(name => { newSubjectResponse.next(name); });

    return newSubjectResponse;
  }

  openCatchErrorModal(alertType, alertMessage, alertButtonMessage,errors): Observable<any>{
    this.catchErrorAlert = true;
    this.alertType = alertType;
    this.alertMessage = alertMessage;
    this.alertButtonMessage = alertButtonMessage;
    this.alerterrors = errors;
    const newSubjectResponse = new Subject();
    this.dialogService.open(alertmodalComponent,
      {
       closeOnEsc: false
      })
      .onClose.subscribe(name => { newSubjectResponse.next(name); });
    return newSubjectResponse;
  }
}
