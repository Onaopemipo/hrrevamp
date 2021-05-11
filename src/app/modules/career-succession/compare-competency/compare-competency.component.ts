import { CompetencyServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-compare-competency',
  templateUrl: './compare-competency.component.html',
  styleUrls: ['./compare-competency.component.scss']
})
export class CompareCompetencyComponent implements OnInit {

  constructor(private compare: CompetencyServiceProxy) { }

  ngOnInit(): void {
  }

  goback(){

  }

  async compareCompetency(){
    const data = await this.compare.compareCompetency(1,1 ).toPromise();
  }



}
