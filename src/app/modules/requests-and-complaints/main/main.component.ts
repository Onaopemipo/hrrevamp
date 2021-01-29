import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Complaint } from './models';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  complaints: Complaint[] = []
  selectedComplaint?: Complaint;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getComplaints().subscribe(data => {
      this.complaints = data.map(iComplaint => new Complaint(iComplaint))
      this.selectedComplaint = this.complaints[0]
    })
  }
  get pagetitle(){
    return 'Request and Complaints'
  }
  rbutton = [
    { name: 'Create New',icon: 'plus',outline: false },
    // { name: 'Add New',icon: 'plus',outline: false },
  ]

  changeSelectedComplaint(complaint: Complaint){
    this.selectedComplaint = complaint
  }

  replyComplaint(){}
  approveComplaint(){}
  rejectComplaint(){}

}
