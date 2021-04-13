import { Component, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { BulkMasterServiceProxy, DataServiceProxy, IDTextViewModel,FileParameter,MessageOut } from 'app/_services/service-proxies';
import { CustomServiceService  } from '../../../_services/custom-service.service';
@Component({
  selector: 'ngx-employeerbulkadd',
  templateUrl: './employeerbulkadd.component.html',
  styleUrls: ['./employeerbulkadd.component.scss']
})
export class EmployeerbulkaddComponent implements OnInit {
  allbulkProcesses: IDTextViewModel[] = [];
  initialUploadResp = new MessageOut().clone();
  constructor(private DataService: DataServiceProxy, private BulkMasterService: BulkMasterServiceProxy,
  private CustomService: CustomServiceService) { }

  removeFile(event: FlowDirective, mFile: Transfer) {
    this.files = this.files.filter(file => file.name !== mFile.name);
    event.cancelFile(mFile);
  }

  files: Transfer[]=[];
  onDropFileceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
 
    });
  }
  filereceived(event: FlowDirective) {
    event.transfers$.subscribe(value => {
      this.files = value.transfers;
      this.files[0].flowFile.file

      
    });
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  getProccessId() {
    this.DataService.getBulkUploadProcesses().subscribe(data => {
      if (!data.hasError) {
        this.allbulkProcesses = data.result;
      }
    })
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  downloadSampleFile() {
    let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
    this.CustomService.downloadSampleTemplate(processId).subscribe((data) => {
      var file = new Blob([data], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = fileURL;
      a.target = "_blank";
      a.download = "Employee Records Upload Template";
      a.click();
      a.remove();
    })
  }
  uploadBulkEmployee() {
    let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
    let FileParameter: FileParameter;
    FileParameter.data = this.files[0].flowFile.file;
    FileParameter.fileName = this.files[0].flowFile.name;
    this.BulkMasterService.bulkUpload(processId, FileParameter).subscribe(data => {
      if (!data.hasError) {
        this.initialUploadResp = data.result;
      }
    })
  }
  ngOnInit(): void {
    this.getProccessId();
  }

}
