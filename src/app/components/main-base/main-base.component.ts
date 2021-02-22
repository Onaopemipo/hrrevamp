import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
enum TOP_ACTIONS {
  createNew
}

export enum TABS {
  SENT, TRASH, DRAFT
}


@Component({
  selector: 'ngx-main-base',
  templateUrl: './main-base.component.html',
  styleUrls: ['./main-base.component.scss']
})
export class MainBaseComponent implements OnInit {

  public TABS: any = TABS;
  public topActionButtons: any = [
  ];
  public tableColumns: TableColumn[] = [];
  tableData = [];
  data = [];
  loading = false;
  constructor() { }

  currentPage = 1;
  loadData() {
    this.loading = true;
    if (this.currentPage === 1) {
      this.data = [];
    }
    const currentPage = this.currentPage;
  }

  createNewClicked() {
    this.showModal = true;
  }

  ngOnInit(): void {
    this.loadData();
  }

  showModal = false;
  pageActionClicked(page) {
    this.showModal = true;
  }

  get showEmpty() {
    return false;
  }

  selectedTab: any = TABS.DRAFT;
  selectTab(tab) {
    this.selectedTab = tab.tabId;
    this.loadData();
  }

  loadNewPage(pageNo: number) {
    this.currentPage = pageNo;
    this.loadData();
  }
}
