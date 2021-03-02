import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';

import { FlowDirective, Transfer } from '@flowjs/ngx-flow';

@Component({
  selector: 'ngx-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<Transfer[]>();
  @Input() btnoutline: string = '';
  @Input() btnLabel: string = '';
  @Input() icanName: string = '';

  constructor( private dialogService: NbDialogService) { }
  
  openbulkUploadModal(dialog: TemplateRef<any>): Observable<any> {
    const newSubjectResponse = new Subject();
    this.dialogService.open(dialog,
      {
        hasBackdrop: false,
        closeOnEsc: false
      })
      .onClose.subscribe(name => { newSubjectResponse.next(name); });

    return newSubjectResponse;
  }
  removeFile(event: FlowDirective, mFile: Transfer) {
    this.files = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }

  files: Transfer[];
  onDropFileceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
    });
  }
  filereceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
    });
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onfileSubmit() {
    this.buttonClick.emit(this.files);
  }

  ngOnInit(): void {
  }

}
