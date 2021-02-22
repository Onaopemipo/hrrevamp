import { Injectable, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'ngx-alertModalComponent',
  template: `
  <nb-card>
  <nb-card-body>
   <div style="display:flex;flex-direction: column;padding:5rem;align-items:center; text-align:center">
   <img src="assets/icons/success.jpg" style="width:10rem" *ngIf="alertType == 'success'">
   <img src="assets/icons/failure.jpg" style="width:10rem" *ngIf="alertType == 'danger'">
   <img src="assets/icons/copied.jpg" style="width:10rem" *ngIf="alertType == 'copied'">
   <div style="padding:10px">
   <span class="header4-bold" *ngIf="alertType == 'success'">Success!</span>
   <span class="header4-bold" *ngIf="alertType == 'danger'">Failed!</span>
   <span class="header4-bold" *ngIf="alertType == 'copied'">Copied!</span>
   </div>
   <div style="padding:10px">
   <span class="listsubheader">{{alertMessage}}!</span>
   </div>
   <div style="padding:10px">
   <button nbButton type="button" status="primary" (click)="submit()">{{alertButtonMessage}}</button>
   </div>

   </div>
  </nb-card-body>

</nb-card>
  `,
})
export class alertmodalComponent implements OnInit {
  alertType: string = '';
  alertMessage: string = '';
  alertButtonMessage: string = '';
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
  constructor(private dialogService: NbDialogService) { }

  openModalAlert(alertType, alertMessage, alertButtonMessage): Observable<any> {
    this.alertType = alertType;
    this.alertMessage = alertMessage;
    this.alertButtonMessage = alertButtonMessage;
    const newSubjectResponse = new Subject();
    this.dialogService.open(alertmodalComponent,
      {
        hasBackdrop: false,
        closeOnEsc: false
      })
      .onClose.subscribe(name => { newSubjectResponse.next(name); });

    return newSubjectResponse;
  }
}
