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
import { ExpenseGroupService, ExpenseProjectService, MyExpenseGroup } from '../services/expense-group.service';


@Component({
  selector: 'ngx-expense-group',
  templateUrl: './expense-group.component.html',
  styleUrls: ['./expense-group.component.scss']
})
export class ExpenseGroupComponent extends AssetBaseComponent<any, any>{
  constructor(
    protected api: ExpenseGroupService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Expense Group';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'referenceId', title: 'Reference ID'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'referenceId', label: 'Reference ID', type: FORM_TYPES.text},
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
}

