import { Component, OnInit } from '@angular/core';
import { NbTabComponent } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Complaint } from './models';

enum TABS {
  REQUEST = '1',
  COMPLAINT = '2',
}

enum TOP_ACTIONS {
  createNew = '1'
}

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  TABS = TABS;
  pageNo = 1;
  complaints: Complaint[] = [];
  selectedComplaint?: Complaint;
  newComplaint = {
    type: 'A',
    employeeId: 1,
    description: '',
    title: '',
  };
  loading = false;
  loadingNext = false;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadRequests() {
    const subject = new Subject<Complaint[]>();
    this.apiService.getComplaints(this.pageNo).subscribe(data => {
      subject.next(data.data.map(iComplaint => new Complaint(iComplaint)));
      subject.complete();
    });
    return subject.asObservable();
  }

  loadComplaints() {
    const subject = new Subject<Complaint[]>();
    this.apiService.getComplaints(this.pageNo).subscribe(data => {
      subject.next(data.data.map(iComplaint => new Complaint(iComplaint)));
      subject.complete();
    });
    return subject.asObservable();
  }
  loadData() {
    let observable: Observable<Complaint[]>;
    if (this.selectedTab === TABS.REQUEST) {
      observable = this.loadRequests();
    } else {
      observable = this.loadComplaints();
    }
    if (this.pageNo === 1 ) {
      this.loading = true;
      this.complaints = [];
      this.selectedComplaint = null;
    }
    observable.subscribe(data => {
      if (this.pageNo === 1) {
        this.complaints = data;
        this.selectedComplaint = this.complaints[0];
      } else {
        this.complaints = this.complaints.concat(data);
      }
      this.loading = false;
      this.loadingNext = false;
    });
  }

  selectedTab: string = TABS.REQUEST;

  selectTab(tab: NbTabComponent) {
    this.selectedTab = tab.tabId;
    this.pageNo = 1;
    this.loadData();
    // if (this.selectedTab === TABS.REQUEST) {
    //   this.loadRequests();
    // } else {
    //   this.loadComplaints();
    // }
  }

  get pagetitle() {
    return 'Request and Complaints';
  }

  rbutton = [
    { name: TOP_ACTIONS.createNew, label: 'Create new', icon: 'plus', outline: false },
    // { name: 'Add New',icon: 'plus',outline: false },
  ];

  changeSelectedComplaint(complaint: Complaint) {
    this.selectedComplaint = complaint;
  }

  loadNext() {
    if (this.loadingNext) return false;
    this.loadingNext = true;
    this.pageNo += 1;
    this.loadData();
    // this.loadRequests();
    return true;
  }

  showCreateModal = false;
  pageActionClicked(event: string) {
    if (event === TOP_ACTIONS.createNew) {
      this.showCreateModal = true;
    }
  }

  loadingSave = false;
  async submitForm() {
    alert(10)
    this.loadingSave = true;
    const res = await this.apiService.createComplaint(this.newComplaint).toPromise();
    this.loadingSave = false;
  }

}
