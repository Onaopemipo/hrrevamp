import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { AssetBaseComponent } from 'app/modules/asset-management/pages/asset-category/asset-category.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { ExpenseProjectActivityService, MyExpenseProjectActivity } from '../services/expense-group.service';

@Component({
  selector: 'ngx-expense-project-activity',
  templateUrl: './expense-project-activity.component.html',
  styleUrls: ['./expense-project-activity.component.scss']
})
export class ExpenseProjectActivityComponent extends AssetBaseComponent<any, any>{
  constructor(
    protected api: ExpenseProjectActivityService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Expense Project Activity';
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
      {name: 'actionTitle', label: 'Title', type: FORM_TYPES.text},
      {name: 'code', label: 'Code', type: FORM_TYPES.text},
      {name: 'referenceId', label: 'Reference ID', type: FORM_TYPES.text},
      {name: 'ban', label: 'BAN', type: FORM_TYPES.checkbox},
      {name: 'closedEnded', label: 'Close Ended', type: FORM_TYPES.checkbox},
      {name: 'range', label: 'Range', type: FORM_TYPES.date_range},
      {name: 'description', label: 'Description', type: FORM_TYPES.textarea},
    ]
  };
  getFormConfig(): FormConfig {
    return {
      fields: [
        {name: 'name', label: 'Name', type: FORM_TYPES.text},
        {name: 'actionTitle', label: 'Title', type: FORM_TYPES.text},
        {name: 'code', label: 'Code', type: FORM_TYPES.text},
        {name: 'referenceId', label: 'Reference ID', type: FORM_TYPES.text},
        {name: 'ban', label: 'BAN', type: FORM_TYPES.text},
        {name: 'closedEnded', label: 'Close Ended', type: FORM_TYPES.checkbox},
        {name: 'range', label: 'Range', type: FORM_TYPES.date_range},
        {name: 'description', label: 'Description', type: FORM_TYPES.textarea},
      ]
    };
  }
  filter = {};
  getNewEditingData(): MyExpenseProjectActivity {
    const data = new MyExpenseProjectActivity();
    data.expenseProjectId = this.project_id;
    return data;
  }

  project_id = 0;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.project_id = Number(data.get('id'));
      super.ngOnInit();
    });
  }
}
