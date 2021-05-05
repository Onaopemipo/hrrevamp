import { Component, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { AlertserviceService } from 'app/_services/alertservice.service';
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
  loading: boolean = false;
  constructor(private DataService: DataServiceProxy, private BulkMasterService: BulkMasterServiceProxy,
  private CustomService: CustomServiceService,private alertservice: AlertserviceService) { }

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

  downloadSampleFile() {
    let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
    this.CustomService.downloadSampleTemplate(processId).subscribe((data) => {
      const dtype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      this.CustomService.downloadFile(data, dtype);

    })
  }
  uploadBulkEmployee() {
    this.loading = true;
    let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
    let FileParameter: FileParameter= {data:'',fileName:''};
    FileParameter.data = this.files[0].flowFile.file;
    FileParameter.fileName = this.files[0].flowFile.name;
    this.BulkMasterService.bulkUpload(processId, FileParameter).subscribe(data => {
      this.loading = false;
      if (!data.hasError) {
        this.initialUploadResp = data.result;

      }
    })
  }
  // processBulkUpload() {
  //   this.loading = true;
  //   let processId = this.allbulkProcesses.find(x => x.text == 'Employee Records Upload').id;
  //   this.BulkMasterService.processBulkUpload(processId, this.initialUploadResp.bulkUploadId).subscribe(data => {
  //     this.loading = false;
  //     this.files = [];
  //         this.initialUploadResp = new MessageOut().clone();
  //     if (!data.hasError) {
  //       this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.SUCCESS, data.message, "ok").subscribe(data => {

  //       })
  //     } else {
  //       this.alertservice.openModalAlert(this.alertservice.ALERT_TYPES.FAILED, data.message, "ok").subscribe(data => {

  //       })
  //     }
  //   })
  // }
  discardProcess() {
    this.files = [];
    this.initialUploadResp = new MessageOut().clone();
  }
  ngOnInit(): void {
    this.getProccessId();
  }

}
