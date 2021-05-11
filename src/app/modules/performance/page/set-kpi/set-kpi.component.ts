import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'app/components/base/base.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { DataServiceProxy } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { last } from 'rxjs/operators';
import { fileURLToPath } from 'url';
import { extend } from 'validate.js';
import { KeyResultAreaService, MyKeyResultArea } from '../../services/key-result-area.service';
import { KpiService, MyKPI } from '../../services/kpi.service';

@Component({
  selector: 'ngx-set-kpi',
  templateUrl: './set-kpi.component.html',
  styleUrls: ['./set-kpi.component.scss']
})
export class SetKpiComponent extends BaseComponent<MyKPI, MyKPI, MyKPI> implements OnInit {
  filter: MyKPI = new MyKPI();
  getData(): Observable<ListResult<MyKPI>> {
    const filter = new MyKPI();
    filter.kra_id = this.kra_id;
    return this.kpiService.list(filter);
  }
  saveData(e: MyKPI): Observable<any> {
    e.kra_id = this.kra_id;
    const data = new MyKPI();
    Object.assign(data, e);
    return this.kpiService.create(data);
  }
  getNewEditingData(): MyKPI {
    return new MyKPI();
  }
  successMessage: string = '';
  deleteData(data: MyKPI): Observable<any> {
    throw new Error('Method not implemented.');
  }
  unitsOfMeasurement = [];
  constructor(
    private KraService: KeyResultAreaService,
    private kpiService: KpiService,
    private dataService: DataServiceProxy,
    private activatedRoute: ActivatedRoute,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBox);
  }

  kra: MyKeyResultArea = new MyKeyResultArea();
  data: MyKPI[] = [];
  kra_id: number = 0;

  ngOnInit(): void {
    this.dataService.getUnitOfMeasurements().subscribe(res => {
      console.log(res);
      this.unitsOfMeasurement = res.result.map(data => {
        return {
          name: String(data.id),
          label: data.text,
        };
      });
      console.log(this.unitsOfMeasurement);
    });
    const init = () => super.ngOnInit();
    this.activatedRoute.paramMap.subscribe(async (data) => {
      this.kra_id = Number(data.get('id'));
      init();
      this.kra = await this.KraService.fetch(this.kra_id).toPromise();
    });
  }

  addKpi(){
    this.data.push(new MyKPI(this.kra.id));
  }

}
