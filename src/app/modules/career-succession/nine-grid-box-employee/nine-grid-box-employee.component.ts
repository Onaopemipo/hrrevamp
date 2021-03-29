import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'app/components/base/base.component';
import { TableColumn } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { Employee } from 'app/_services/service-proxies';
import { Observable, Subject, Subscription } from 'rxjs';
import { MyEmployeeDatail } from '../services/employees.service';
import { NineBoxGridService, NINE_BOX_GRID } from '../services/nine-box-grid.service';
import { SuccessionPlanService } from '../services/succession-plan.service';

@Component({
  selector: 'ngx-nine-grid-box-employee',
  templateUrl: './nine-grid-box-employee.component.html',
  styleUrls: ['./nine-grid-box-employee.component.scss']
})
export class NineGridBoxEmployeeComponent extends BaseComponent<MyEmployeeDatail, MyEmployeeDatail, MyEmployeeDatail> {
  filter: MyEmployeeDatail;
  data: MyEmployeeDatail[] = [];
  pageName = '';
  id = 1;
  getData(): Observable<ListResult<MyEmployeeDatail>> {
    return this.api.fetchEmployee(this.id);
  }
  saveData(e: MyEmployeeDatail): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getNewEditingData(): MyEmployeeDatail {
    return new MyEmployeeDatail({});
  }
  successMessage: string;
  deleteData(data: MyEmployeeDatail): Observable<any> {
    throw new Error('Method not implemented.');
  }

  tableColumns: TableColumn[] = [
    {name: 'employee_name', title: 'Name'},
    {name: 'position_name', title: 'Position'},
    {name: 'location_name', title: 'Location'},
    {name: 'level', title: 'Level'},
  ];
  constructor(
    protected alertService: AlertserviceService,
    protected confirmBox: ConfirmBoxService,
    private api: NineBoxGridService,
    private plan: SuccessionPlanService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(confirmBox);
  }

  async ngOnInit() {
    window.globalThis.ccc = NINE_BOX_GRID;
    this.activatedRoute.paramMap.subscribe(data => {
      this.id = Number(data.get('id'));
      console.log(data.get('id'));
      this.pageName = Object.keys(NINE_BOX_GRID).find(key => NINE_BOX_GRID[key] == this.id);
      super.ngOnInit();
      // subscription.unsubscribe();
    });

  }

}
