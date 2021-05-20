import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { AssetBaseComponent } from 'app/modules/asset-management/pages/asset-category/asset-category.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AssetDTO } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { ExpenseGroupService, ExpenseProjectService, MyExpenseGroup, MyExpenseProject } from '../services/expense-group.service';

enum ACTIONS{
  activities = 'activities'
}
@Component({
  selector: 'ngx-expense-project',
  templateUrl: './expense-project.component.html',
  styleUrls: ['./expense-project.component.scss']
})
export class ExpenseProjectComponent extends AssetBaseComponent<any, any>{
  constructor(
    protected api: ExpenseProjectService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private router: Router,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Expense Project';
  getTableColumns(): TableColumn[] {
    return [
      { name: 'name', title: 'REF ID' },
      { name: 'referenceId', title: 'Name' },
      { name: 'startDate', title: 'Start Date', type: ColumnTypes.Date },
      { name: 'endDate', title: 'End Date', type: ColumnTypes.Date },
      { name: 'date', title: 'Status', type: ColumnTypes.Status },
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'referenceId', label: 'Reference ID', type: FORM_TYPES.text},
      {name: 'startDate', label: 'Start Date', type: FORM_TYPES.date},
      {name: 'endDate', label: 'End Date', type: FORM_TYPES.date},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      ]
    };
  }
  filter = {};
  getNewEditingData(): MyExpenseGroup {
    return new MyExpenseGroup();
  }

  getTableActions(): TableAction[] {
    const actions = super.getTableActions();
    return [
      {name: ACTIONS.activities, label: 'Activities'},
      ...actions,
    ];
  }

  tableActionClick(event: TableActionEvent<MyExpenseProject>) {
    if (super.tableActionClick(event)) return true;
    this.router.navigateByUrl(`expenses/project/${event.data.id}/activities`)
    return true;
  }
}