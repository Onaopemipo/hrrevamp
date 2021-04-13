import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyResultAreaService, MyKeyResultArea } from '../../services/key-result-area.service';

@Component({
  selector: 'ngx-assign-kra',
  templateUrl: './assign-kra.component.html',
  styleUrls: ['./assign-kra.component.scss']
})
export class AssignKraComponent implements OnInit {
  reviewer = [];
  employees = [];
  kra_id = 0;
  kra: MyKeyResultArea;
  constructor(
    private activatedRoute: ActivatedRoute,
    private kraService: KeyResultAreaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (data) => {
      this.kra_id = Number(data.get('id'));
      this.kra = await this.kraService.fetch(this.kra_id).toPromise();
    });
  }

  assignKra() {
    this.kraService.assignObj(this.kra, this.reviewer.join(','), this.employees.join(',')).toPromise();
  }

}
