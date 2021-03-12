import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { SetUpsServiceProxy, VwLocation } from 'app/_services/service-proxies';
import { ApiService, LocationFilter, MyDepartment, MyLocation } from '../../services/api.service';
import { PageService } from '../../services/page.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { Observable, of } from 'rxjs';

enum TOP_ACTIONS { ADD_DEPARTMENT, }
enum ACTIONS { EDIT = '1', DELETE = '2' }
const SUCCESS_MESSAGES = {
  create: 'Location Created Successfully',
  edit: 'Location Edited Successfully',
  delete: 'Location Deleted Successfully',
};

@Component({
  selector: 'ngx-department-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent extends BaseComponent<MyLocation, LocationFilter, VwLocation> implements OnInit {
  topActionButtons = [
    { name: TOP_ACTIONS.ADD_DEPARTMENT, label: 'Add Location', icon: '', outline: false },
  ];

  TOP_ACTIONS = TOP_ACTIONS;

  tableColumns = [
    { name: 'name', title: 'Location Name' },
    { name: 'state_name', title: 'State Name' },
    { name: 'lga_name', title: 'LG Name' },
    { name: 'status', title: 'Status', type: ColumnTypes.Status },
  ];

  tableActions: TableAction[] = [
    { name: ACTIONS.EDIT, label: 'Edit' },
    { name: ACTIONS.DELETE, label: 'Delete' },
  ];

  data: MyLocation[] = [];
  successMessage = SUCCESS_MESSAGES.edit;
  // editingData = new VwDepartment();
  filter = {};

  getNewEditingData() { return new VwLocation(); }

  saveData(data: VwLocation) {
    if (this.editingData.id) {
      this.successMessage = SUCCESS_MESSAGES.edit;
    } else {
      this.successMessage = SUCCESS_MESSAGES.create;
    }
    return this.setup.addandUpdateLocation(this.editingData);
  }

  getData() {
    return this.api.fetchAllLocation(this.filter);
  }

  tableActionClicked(event: TableActionEvent) {
    const editingObject = this.getNewEditingData().toJSON();
    const data: any = event.data;
    const tempDepartment: MyLocation = data;
    this.editingData = {
      ...editingObject,
      ...{ department_name: tempDepartment.location.location_name }
    };
    if (event.name === ACTIONS.EDIT) {
      this.showModal = true;
    }
    if (event.name === ACTIONS.DELETE) {
      this.deleteRow('Are you sure to delete this location?');
    }
  }

  deleteData() {
    // Todo
    return of();
    // return this.setup.deleteRecord(this.data.find(location => this.editingData.id === location.id).location);
  }

  public constructor(
    private api: ApiService,
    private setup: SetUpsServiceProxy,
    private pageService: PageService,
    protected confirmBox: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBox);
  }

  validator = {
    location_name: {
      presence: true,
    },
    state_id: {
      presence: true
    },
    lga_id: {
      presence: true,
    },
  };
}
