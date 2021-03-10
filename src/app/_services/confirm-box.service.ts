import { Injectable, Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'ngx-cofirm-box',
  template: `
  <nb-card>
  <nb-card-body>
    {{message}}
    <button (click)="onYes()">Yes</button>
    <button (click)="onNo()">No</button>
  </nb-card-body>
</nb-card>
  `,
})
export class ConfirmBoxServiceComponent implements OnInit {
  message: string = '';
  constructor(protected ref: NbDialogRef<ConfirmBoxServiceComponent>, private alertController: ConfirmBoxService ) {}
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
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmBoxService {
  dialog?: NbDialogRef<ConfirmBoxServiceComponent>;
  message: string = '';
  private subject?: Subject<boolean>;
  constructor(private dialogService: NbDialogService) { }

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
  showLoading(){
    // this.dialog.componentRef
  }
  close() {
    this.dialog.close();
  }
  yesSelected() {
    // this.dialog.close();
    this.subject.next(true);
  }
  noSelected() {
    // this.dialog.close();
    this.subject.next(false);
  }
}
