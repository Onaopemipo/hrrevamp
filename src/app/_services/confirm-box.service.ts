import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
import { Observable, Subject, Subscription } from 'rxjs';


@Component({
  selector: 'ngx-cofirm-box',
  template: `
  <nb-card style="background-color: white; width:400px; height: 250px">
  <nb-card-body style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="padding-bottom: 20px;">
        <h5>{{message}}</h5>
    </div>

    <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center;">
      <ngx-loadable-button status="primary" (click)="onYes()" [loading]="loading" style="margin-right: 2rem;">Yes</ngx-loadable-button>
      <button nbButton outline status="danger" (click)="onNo()" style="margin-right: 1rem; color: #EB5757;">Cancel</button>
    </div>
  </nb-card-body>
</nb-card>
  `,
})
export class ConfirmBoxServiceComponent implements OnInit, OnDestroy {
  message: string = '';
  loading: boolean;
  subscription: Subscription;
  constructor(protected ref: NbDialogRef<ConfirmBoxServiceComponent>, private alertController: ConfirmBoxService ) {
    this.subscription = this.alertController.getLoading().subscribe(loading => {this.loading = loading})
  }
  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close('closed');
  }

  onYes() {
    this.alertController.yesSelected()
  }

  onNo() {
    this.alertController.noSelected()
  }

  ngOnInit(): void {
    this.message = this.alertController.message;
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmBoxService {
  dialog?: NbDialogRef<ConfirmBoxServiceComponent>;
  message: string = '';
  private subject?: Subject<boolean>;
  constructor(private dialogService: NbDialogService) {
    this.loading = new Subject<boolean>();
  }

  public confirm(message: string): Observable<boolean> {
    this.message = message;
    const newSubjectResponse = new Subject();
    this.dialog = this.dialogService.open(ConfirmBoxServiceComponent,
      {
        hasBackdrop: false,
        closeOnEsc: false
      });
    this.subject = new Subject();
    return this.subject.asObservable();
      // .onClose.subscribe(name => { newSubjectResponse.next(name); });

    // return newSubjectResponse;
  }
  loading: Subject<boolean>;
  getLoading(){
    return this.loading.asObservable();
  }
  showLoading(){
    this.loading.next(true);
  }
  hideLoading(){
    this.loading.next(false);
  }
  close() {
    this.dialog.close();
  }
  yesSelected() {
    // this.dialog.close();
    this.subject.next(true);
    this.subject.complete();
  }
  noSelected() {
    // this.dialog.close();
    this.subject.next(false);
    this.subject.complete();
  }
}
