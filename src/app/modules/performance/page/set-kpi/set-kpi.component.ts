import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyResultAreaService, MyKeyResultArea } from '../../services/key-result-area.service';
import { MyKPI } from '../../services/kpi.service';

@Component({
  selector: 'ngx-set-kpi',
  templateUrl: './set-kpi.component.html',
  styleUrls: ['./set-kpi.component.scss']
})
export class SetKpiComponent implements OnInit {
  editingData: any = {};
  constructor(
    private KraService: KeyResultAreaService,
    private activatedRoute: ActivatedRoute,
  ) { }

  kra: MyKeyResultArea = new MyKeyResultArea();
  data: MyKPI[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (data) => {
      this.kra = await this.KraService.fetch(Number(data.get('id'))).toPromise();
    });
  }

  addKpi(){
    this.data.push(new MyKPI(this.kra.id));
  }

}
