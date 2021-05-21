import { Component, Input, OnInit, Output } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { DisciplineManagementDTO, DisciplineTemplateDTO, FetchDisciplineLogServiceProxy } from 'app/_services/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';


enum TOP_ACTIONS { DISCIPLINE, }



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
    { name: 'date', title: 'Recipient' },
    { name: 'date', title: 'Department' },
    { name: 'date', title: 'Subject' },
    { name: 'date', title: 'Discipline Type' },
    { name: 'date', title: 'Date Sent' },
    { name: 'date', title: 'Status' }
  ];
  pageName = "Disciplinary Management"
  IsReward: boolean = false;
  filter = {
    iD:  undefined,
    disciplinaryTypeId:  undefined,
    pageSize: 10,
    pageNumber: 1
  }
  DisciplineManagementList: DisciplineManagementDTO[] = [];
  constructor( private acitivatedroute: ActivatedRoute, private router: Router,private FetchDisciplineLogService: FetchDisciplineLogServiceProxy ) {
    super();
  }
  get showEmpty(){
    return this.DisciplineManagementList.length === 0;
  }
  getallLog() {
    this.loading = true;
    this.FetchDisciplineLogService.fetchDisciplineLog(this.filter.iD, this.filter.disciplinaryTypeId, this.filter.pageSize, this.filter.pageNumber).subscribe(data => {
      this.loading = false; 
      if (!data.hasError) {
        this.DisciplineManagementList = data.result;
      }
    })
  }
  AddNewDiscipline() {
    var param = this.IsReward ? "reward" : "discipline";
    this.router.navigate(['/discipline/create/' + param]);
  }
  ngOnInit() {
    this.getallLog();
    this.acitivatedroute.params.subscribe(data => {
      //    console.log(data);
          if (data.type) {
            var typ = data.type;
            this.IsReward = typ == "reward" ? true : false;
            this.pageName= typ == "reward" ? "Reward Management" : "Disciplinary Management";
          }
        });
  }

}
