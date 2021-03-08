import { Component, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
@Component({
  selector: 'ngx-employeerbulkadd',
  templateUrl: './employeerbulkadd.component.html',
  styleUrls: ['./employeerbulkadd.component.scss']
})
export class EmployeerbulkaddComponent implements OnInit {

  constructor() { }

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
  ngOnInit(): void {
  }

}
