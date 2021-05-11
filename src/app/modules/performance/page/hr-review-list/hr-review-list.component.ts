import { SubordinateAppraisalsServiceProxy } from 'app/_services/service-proxies';
import { GetHRAppraisalReviewsServiceProxy } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-hr-review-list',
  templateUrl: './hr-review-list.component.html',
  styleUrls: ['./hr-review-list.component.scss']
})
export class HrReviewListComponent implements OnInit {

  data = [];
  constructor(
    private hrListService: GetHRAppraisalReviewsServiceProxy,
    private supervisorListService: SubordinateAppraisalsServiceProxy,
  ) { }

  ngOnInit(): void {
    this.supervisorListService.subordinateAppraisalLists(0).subscribe();
    // this.hrListService.fetchHRAppraisalReviews(0, 10, 1).subscribe(data => {
    //   this.data = data.result;
    // })
  }

}
