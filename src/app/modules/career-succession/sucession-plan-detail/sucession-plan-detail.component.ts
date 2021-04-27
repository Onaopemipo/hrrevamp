import { GetCareerSuccesionPlanByIdServiceProxy, CareerSuccessionDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'app/components/base/base.component';
import { TopAction } from 'app/components/componentsheader/models';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { Observable } from 'rxjs';
import { MySuccessionPlan, SuccessionPlanEmployee, SuccessionPlanService } from '../services/succession-plan.service';

@Component({
  selector: 'ngx-sucession-plan-detail',
  templateUrl: './sucession-plan-detail.component.html',
  styleUrls: ['./sucession-plan-detail.component.scss']
})
export class SucessionPlanDetailComponent extends BaseComponent<SuccessionPlanEmployee, SuccessionPlanEmployee, SuccessionPlanEmployee>{
  filter: SuccessionPlanEmployee;
  data: SuccessionPlanEmployee[] = [];
  plan: MySuccessionPlan;
  id: number;
  getData(): Observable<ListResult<SuccessionPlanEmployee>> {
    return this.api.getEmployees(this.id);
  }
  saveData(e: SuccessionPlanEmployee): Observable<any> {
    return this.api.addEmployeeToPlan(this.plan, e);
  }
  getNewEditingData(): SuccessionPlanEmployee {
    return new SuccessionPlanEmployee();
  }
  tableActions = [];
  tableActionClicked() {}
  tableColumns: TableColumn[] = [
    {name: 'name', title: 'Name', type: ColumnTypes.Text},
    {name: 'position', title: 'Position'},
    {name: 'department', title: 'Department'},
    {name: 'readiness', title: 'Readiness'},
  ];
  successMessage: string;
  protected alertService: AlertserviceService;
  deleteData(data: SuccessionPlanEmployee): Observable<any> {
    throw new Error('Method not implemented.');
  }
  requiredButtons: TopAction[] = [
    {name: 'a', label: 'Add Employee', icon: 'plus'},
  ];

  showModal = false;
  planData: CareerSuccessionDTO = new CareerSuccessionDTO;
  planTitle: string = '';

  editingData = new SuccessionPlanEmployee();

  constructor(
    protected confirmBox: ConfirmBoxService,
    // protected alertService: AlertserviceService,
    private api: SuccessionPlanService,
    private activatedRoute: ActivatedRoute,
    private getPlan: GetCareerSuccesionPlanByIdServiceProxy
  ) {
    super(confirmBox);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.id = Number(data.get('id'));
      this.api.fetch(this.id).toPromise().then(_data => {
        this.plan = _data;
      });
      super.ngOnInit();
    });
  }

  async getSinglePlan(){
    const data = await this.getPlan.getCareerSuccessionPlanById(1).toPromise();
    if(!data.hasError){
      this.planData = data.result;
      this.planTitle = this.planData.title;
    }
  }

}
