import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Email } from '../models';

enum TOP_ACTIONS {
  createNew
}

enum TABS {
  SENT, TRASH, DRAFT
}

@Component({
  selector: 'ngx-email-log',
  templateUrl: './email-log.component.html',
  styleUrls: ['./email-log.component.scss']
})
export class EmailLogComponent implements OnInit {
  TABS = TABS;
  rbutton = [
    { name: TOP_ACTIONS.createNew, label: 'Create new', icon: 'plus', outline: false },
    // { name: 'Add New',icon: 'plus',outline: false },
  ];
  columns = [
    {name: 'subject', title: 'SUBJECT'},
    {name: 'reciepient', title: 'RECIEPIENT'},
    {name: 'cc-reciepient', title: 'CC RECIEPIENT'},
    {name: 'status', title: 'STATUS'},
  ];
  data = {};
  emails: Email[] = [];
  loading = false;
  constructor(
    private api: ApiService
  ) { }

  currentPage = 1;
  loadData() {
    this.loading = true;
    const currentPage = this.currentPage;
    this.api.fetch_emails(this.selectedTab, currentPage).subscribe(data => {
      this.loading = true;
      if (this.currentPage === 1) {
        this.data = {};
      }
      this.data[currentPage] = data.map(iEmail => new Email(iEmail));
      this.emails.concat(this.data[currentPage]);
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  showCreateModel = false;
  pageActionClicked(actionName) {
    this.showCreateModel = true;
  }

  selectedTab = TABS.DRAFT;
  selectTab(tab) {
    this.selectedTab = tab;
    this.loadData();
  }
}
