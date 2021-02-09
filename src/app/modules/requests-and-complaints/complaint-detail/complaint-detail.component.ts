import { Component, Input, OnInit } from '@angular/core';
import { Complaint } from '../main/models';

@Component({
  selector: 'ngx-complaint-detail',
  templateUrl: './complaint-detail.component.html',
  styleUrls: ['./complaint-detail.component.scss']
})
export class ComplaintDetailComponent implements OnInit {

  @Input() set value(val: Complaint) {
    this.selectedComplaint = val;
  }

  loading: false;
  selectedComplaint: Complaint;

  constructor() { }

  ngOnInit(): void {
  }

  replyComplaint() {}
  approveComplaint() {}
  rejectComplaint() {}


}
