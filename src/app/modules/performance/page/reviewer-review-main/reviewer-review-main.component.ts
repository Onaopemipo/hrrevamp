import { KpiReviewDTO } from './../../../../_services/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PerformanceEmployeeType } from '../performance-review/performance-review.component';

@Component({
  selector: 'ngx-reviewer-review-main',
  templateUrl: './reviewer-review-main.component.html',
  styleUrls: ['./reviewer-review-main.component.scss']
})
export class ReviewerReviewMainComponent implements OnInit {

  performanceEmployeeType = PerformanceEmployeeType.reviewer;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  cycle_id = 0;
  kra_id = 0;
  employee_id = 0;
  kra_object: KpiReviewDTO;
  kra = new KpiReviewDTO();
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      this.cycle_id = Number(data.get('cycle_id'));
      this.kra_id = Number(data.get('kra_id'));
      this.employee_id = Number(data.get('employee_id'));
      const kra_object = new KpiReviewDTO();
      kra_object.cycleId = this.cycle_id;
      kra_object.kraId = this.kra_id;
      kra_object.employeeContractId = this.employee_id;
      window.setTimeout(() => {this.kra_object = new KpiReviewDTO({...kra_object});}, 500);
      console.log(this.kra_object);
    });
  }
}
