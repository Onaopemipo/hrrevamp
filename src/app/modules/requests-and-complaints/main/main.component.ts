import { Component, OnInit } from '@angular/core';
import { NbTabComponent } from '@nebular/theme';
import { ManageRequestDTO, RequestTypeDTO } from 'app/_services/service-proxies';
import { Observable, Subject } from 'rxjs';
import * as validate from 'validate.js';
import { ApiService, RequestFilter } from '../services/api.service';
import { Complaint } from './models';

enum TABS {
  REQUEST = 1,
  COMPLAINT = 2,
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
  newComplaint = new ManageRequestDTO();
  loading = false;
  loadingNext = false;
  requestTypes: RequestTypeDTO[] = [];


  constructor(
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    this.requestTypes = await this.apiService.getRequestTypes().toPromise();
    this.loadData();
  }

  getFilter(): RequestFilter {
    return {
      pageNo: this.pageNo,
      typeId: this.selectedTab,
    }
  }

  loadRequests() {
    const subject = new Subject<Complaint[]>();
    this.apiService.getComplaints(this.getFilter()).subscribe(data => {
      console.log(data);
      subject.next(data.data.map(iComplaint => new Complaint(iComplaint)));
      subject.complete();
    });
    return subject.asObservable();
  }

  // loadComplaints() {
  //   this.filter.typeId = TABS.COMPLAINT;
  //   const subject = new Subject<Complaint[]>();
  //   this.apiService.getComplaints(this.getFilter()).subscribe(data => {
  //     subject.next(data.data.map(iComplaint => new Complaint(iComplaint)));
  //     subject.complete();
  //   });
  //   return subject.asObservable();
  // }
  loadData() {
    const observable: Observable<Complaint[]> = this.loadRequests();
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

  selectedTab: number = TABS.REQUEST;

  selectTab(tab: NbTabComponent) {
    this.selectedTab = Number(tab.tabId);
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
  validator = {
    description: {
      presence: true,
    },
    employeeId: {
      presence: true,
    },
    requestTypeId: {
      presence: true,
    },
    title: {
      presence: true,
    }
  };

  errors: any = {};

  async submitForm() {
    const err = validate(this.newComplaint, this.validator);
    if (err) {
      this.errors = err;
      console.log(err);
      return false;
    }
    this.loadingSave = true;
    const res = await this.apiService.createComplaint(this.newComplaint).toPromise();
    this.loadingSave = false;
  }

}
