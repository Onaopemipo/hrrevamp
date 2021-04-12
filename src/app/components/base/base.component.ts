import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { IMessageOut, MessageOutApiResult } from 'app/_services/service-proxies';
// import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { Observable } from 'rxjs';
import * as validate from 'validate.js';
import { ListResult } from '../../_services/base-api.service';

enum TOP_ACTIONS {
  createNew
}

export enum TABS {
  SENT, TRASH, DRAFT
}

@Component({
  template: ''
})
export abstract class MainBaseComponent{

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
    return this.data.length === 0;
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

@Component({
  template: ''
})
export abstract class BaseComponent<D, F, E> extends MainBaseComponent implements OnInit {

  // protected abstract confirmBox: ConfirmBoxService;
  errors = {};
  validator = {};
  abstract filter: F;
  abstract data: D[];
  editingData = this.getNewEditingData();
  constructor(protected confirmBox: ConfirmBoxService) {
    super();
  }

  abstract getData(): Observable<ListResult<D>>;
  abstract saveData(e: E): Observable<any>;
  abstract getNewEditingData(): E;
  abstract successMessage: string;
  loadingSave = false;
  protected abstract alertService: AlertserviceService;

  loadData() {
    this.loading = true;
    console.log(111)
    this.getData().subscribe(data => {
      this.data = data.data;
      this.tableData = this.data;
      this.loading = false;
    });
  }
  filterUpdated(filter: any) {
    this.filter = {...this.filter, ...filter};
    this.loadData();
  }
  submitForm() {
    const err = validate(this.editingData, this.validator);
    if (err) {
      this.errors = err;
      return false;
    }
    this.errors = {};
    this.loadingSave = true;
    this.saveData(this.editingData).subscribe(data => {
      this.loadingSave = false;
      if (data.isSuccessful) {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS,
          this.successMessage, 'Ok').subscribe(data => {
            this.reload();
          });
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED,
          data.message, 'Ok').subscribe(data => {
        });
      }
    });
  }
  ngOnInit() {
    this.loadData();
  }
  hideModal() {
    this.showModal = false;
  }
  reload() {
    this.loading = false;
    this.hideModal();
    this.loadData();
  }

  clearEditingData() {
    this.editingData = this.getNewEditingData();
    this.errors = {};
  }

  abstract deleteData(data: E): Observable<any>;
  deleteRow(confirmMessage: string) {
    this.confirmBox.confirm(confirmMessage).subscribe(data => {
      if (data) {
        this.confirmBox.showLoading();
        this.deleteData(this.editingData).subscribe(data => {
          this.confirmBox.close();
          // this.alertService.openModalAlert()
          this.reload();
        })
      } else {
        this.confirmBox.close();
      }
    });
  }

  createNewClicked() {
    this.editingData = this.getNewEditingData();
    console.log(this.editingData)
    this.showModal = true;
  }
  pageActionClicked(page) {
    this.editingData = this.getNewEditingData();
    console.log(this.editingData)
    this.showModal = true;
  }
}
