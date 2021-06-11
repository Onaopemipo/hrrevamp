import { Component, Input, OnInit, Output } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { DisciplineManagementDTO, DisciplineTemplateDTO, FetchDisciplineLogServiceProxy } from 'app/_services/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { IStatus, MyColor } from 'app/components/status/models';


enum TOP_ACTIONS { DISCIPLINE, }
export class logWithStatus extends DisciplineManagementDTO implements IStatus {
  mgtLog: DisciplineManagementDTO;

  constructor(mgtLog: DisciplineManagementDTO) {
    super(mgtLog);
    this.mgtLog = mgtLog;

  }

  getStatusLabel() {
    if (this.mgtLog.status === 1) return 'Pending';
    if (this.mgtLog.status === 2) return 'Approved';
    if (this.mgtLog.status === 3) return 'Rejected';

  }
  getStatusColor() {
    if (this.mgtLog.status === 1) return new MyColor(242, 153, 74);
    if (this.mgtLog.status ===2) return new MyColor(0, 153, 74);
    if (this.mgtLog.status === 3) return new MyColor(242, 0, 74);
    return new MyColor(253, 238, 238);
  }
}


@Component({
  selector: 'ngx-disciplinary-management-log',
  templateUrl: './disciplinary-management-log.component.html',
  styleUrls: ['./disciplinary-management-log.component.scss']
})
export class DisciplinaryManagementLogComponent extends MainBaseComponent {
  topActionButtons = [
    { name: 'DISCIPLINE', label: 'Discipline', icon: '', outline: false },
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  tableColumns = [
    { name: 'employeeName', title: 'Recipient' ,type: ColumnTypes.Text},
    { name: 'employeeDepartmentName', title: 'Department' ,type: ColumnTypes.Text},
    { name: 'subject', title: 'Subject',type: ColumnTypes.Text },
    { name: 'disciplinaryTypeName', title: 'Discipline Type',type: ColumnTypes.Text },
    { name: 'dateSent', title: 'Date Sent',type: ColumnTypes.Date },
    { name: 'status', title: 'Status' ,type: ColumnTypes.Status}
  ];
  tableActions = [

  ];
  totalItems = 0;
  currentPage = 1;
  pageName = "Disciplinary Management"
  IsReward: boolean = false;
  filter = {
    iD:  undefined,
    disciplinaryTypeId:  undefined,
    pageSize: 10,
    pageNumber: 1
  }
  DisciplineManagementList= [];
  constructor( private acitivatedroute: ActivatedRoute, private router: Router,private FetchDisciplineLogService: FetchDisciplineLogServiceProxy ) {
    super();
  }
  filterUpdated(filter: any) {
    this.filter = { ...this.filter, ...filter };
    this.getallLog();
  }
  get showEmpty(){
    return this.DisciplineManagementList.length === 0;
  }
  getallLog() {
    this.loading = true;
    this.FetchDisciplineLogService.fetchDisciplineLog(this.filter.iD, this.filter.disciplinaryTypeId,this.IsReward, this.filter.pageSize, this.filter.pageNumber).subscribe(data => {
      this.loading = false; 
      if (!data.hasError) {        
        var rs = data.result.map(x=>new logWithStatus(x))
        this.DisciplineManagementList = rs;
        this.totalItems = data.totalRecord;
      }
    })
  }
  AddNewDiscipline() {
    var param = this.IsReward ? "reward" : "discipline";
    this.router.navigate(['/discipline/create/' + param]);
  }
  ngOnInit() {

    this.acitivatedroute.params.subscribe(data => {
      //    console.log(data);
          if (data.type) {
            var typ = data.type;
            this.IsReward = typ == "reward" ? true : false;
            this.pageName= typ == "reward" ? "Reward Management" : "Disciplinary Management";
          }
    });
    this.getallLog();
  }

}
