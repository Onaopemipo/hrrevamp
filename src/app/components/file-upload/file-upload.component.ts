import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';

@Component({
  selector: 'ngx-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() single = true;
  @Input() value: Transfer[]|Transfer = [];
  @Output() valueChange = new EventEmitter<Transfer[]|Transfer>();
  @Input() inputText: string;
  set files(data: Transfer[]) {
    this._files = data;
    if (this.single) {
      if (this._files.length > 0) {
        this.valueChange.emit(this._files[0]);
      } else {
        this.valueChange.emit(null);
      }
    } else {
      this.valueChange.emit(this._files);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  removeFile(event: FlowDirective, mFile: Transfer) {
    this.files = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }

  _files: Transfer[];
  get files() {
    let file = this._files;
    if(!file){
      file = [];
    }
    return file;
  }
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
}
