import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnTypes, TableColumn, TableAction, TableActionEvent } from 'app/components/tablecomponent/models';
import { CommunicationServiceProxy, IDTextViewModel } from 'app/_services/service-proxies';
import { ApiService } from '../../api.service';
import { Email } from '../models';

enum TOP_ACTIONS {
  createNew
}

export enum TABS {
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
  columns: TableColumn[] = [
    {name: 'subject', title: 'SUBJECT', type: ColumnTypes.Text},
    {name: 'recipient', title: 'RECIEPIENT', type: ColumnTypes.Text},
    // {name: 'cc_recipient', title: 'CC RECIEPIENT', type: ColumnTypes.Text},
    {name: 'date_sent', title: 'DATE SENT', type: ColumnTypes.Date},
    {name: 'status', title: 'STATUS', type: ColumnTypes.Status},
  ];
  data = {};
  emails: Email[] = [];
  templateTypes: IDTextViewModel[] = [];
  loading = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private comService: CommunicationServiceProxy,
  ) { }

  currentPage = 1;
  loadData() {
    this.loading = true;
    const currentPage = this.currentPage;
    this.api.fetch_emails(this.selectedTab, currentPage).subscribe(data => {
      if (this.currentPage === 1) {
        this.data = {};
      }
      this.data[currentPage] = data;
      this.emails = this.data[currentPage];
      this.loading = false;
    });
  }

  async ngOnInit() {
    this.loadData();
    const res = await this.comService.getAllTemplateTypes().toPromise();
    this.templateTypes = res.result;
  }

  showCreateModel = false;
  pageActionClicked(page) {
    this.showCreateModel = true;
  }

  selectedTab = TABS.DRAFT;
  selectTab(tab) {
    this.selectedTab = tab.tabId;
    this.loadData();
  }

  loadNewPage(pageNo: number) {
    this.currentPage  = pageNo;
    this.loadData();
  }

  tableAction: TableAction[] = [
    {name: 'detail', label: 'Detail'}
  ]

  tableActionClicked(event: TableActionEvent<Email>) {
    this.router.navigateByUrl(`/communications/email/` + event.data.iObj.id + `/detail`)
  }
}
