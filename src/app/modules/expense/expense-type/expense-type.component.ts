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
import { ExpenseGroupService, ExpenseProjectService, ExpenseTypeService, MyExpenseGroup, MyExpenseType } from '../services/expense-group.service';

@Component({
  selector: 'ngx-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss']
})
export class ExpenseTypeComponent  extends AssetBaseComponent<any, any>{
  constructor(
    protected api: ExpenseTypeService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private router: Router,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Expense Type';
  getTableColumns(): TableColumn[] {
    return [
        { name: 'referenceId', title: 'REF ID' },
        { name: 'name', title: 'Name' },
        // { name: 'date', title: 'Sub-Type' },
        { name: 'code', title: 'Budget Code' }
    
        // { name: 'name', title: 'REF ID' },
        // { name: 'referenceId', title: 'Name' },
        // { name: 'startDate', title: 'Start Date', type: ColumnTypes.Date },
        // { name: 'endDate', title: 'End Date', type: ColumnTypes.Date },
        // { name: 'date', title: 'Status', type: ColumnTypes.Status },
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'referenceId', label: 'Reference ID', type: FORM_TYPES.text},
      {name: 'code', label: 'Code', type: FORM_TYPES.text},
      {name: 'ledgerNo', label: 'Ledger Nos', type: FORM_TYPES.text},
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
  getNewEditingData(): MyExpenseType {
    return new MyExpenseType();
  }

  getTableActions(): TableAction[] {
    const actions = super.getTableActions();
    return [
      {name: 'subtypes', label: 'SubTypes'},
      ...actions,
    ];
  }

  tableActionClick(event: TableActionEvent<MyExpenseType>) {
    if (super.tableActionClick(event)) return true;
    this.router.navigateByUrl(`expenses/type/${event.data.id}/subtypes`);
    return true;
  }
}
