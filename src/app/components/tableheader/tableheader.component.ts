import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/angular';
import { TableAction, TableColumn,ColumnTypes } from '../tablecomponent/models';
import { NbPopoverDirective } from '@nebular/theme';
const SORT_KEY = 'sort';
export interface FilterField extends TableColumn {};
@Component({
  selector: 'ngx-tableheader',
  templateUrl: './tableheader.component.html',
  styleUrls: ['./tableheader.component.scss']
})
export class TableheaderComponent implements OnInit {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  @Input() filterFields: FilterField[] = [];
  @Input() set filter(val: boolean) {
    this.showFilter = val;
  }
  @Input() showCheckBox: boolean = false;
  @Output() bulkAction_Checked =new EventEmitter<boolean>();
  @Input() Bulkactions: TableAction[];
  @Input() showBulkAction: boolean = false;
  filterData: object = {};
  showFilter = false;
  sort = '';
  @Output() filterChange = new EventEmitter<boolean>();
  @Output() filterDataChange = new EventEmitter<object>();
  @Output() downloadasChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Input() bulkAction_isChecked: boolean = false;
  COLUMN_TYPES = ColumnTypes;
  constructor() { }
  setListVal() {
    if (this.filterFields.length > 0) {
      this.filterFields.forEach(val => {
        if (!val.listValue) {
          val.listValue = [];
        }
      })
  }
}
  ngOnInit(): void {
    this.setListVal();
  }
  handleSearch(value) {
    this.searchChange.emit(value)
  }
  downloadas(downloadtype) {
    this.popover.hide();
    this.downloadasChange.emit(downloadtype);
  }
  checkedAcction() {
    this.bulkAction_isChecked = !this.bulkAction_isChecked;
    this.bulkAction_Checked.emit(this.bulkAction_isChecked);
  }
  changeFilter() {
    this.showFilter = !this.showFilter;
    this.filterChange.emit(this.showFilter);
  }

  fieldValueChanged(ev, fieldName) {
    this.filterData[fieldName] = ev.target.value;
  }

  sortChanged() {
    this.filterData[SORT_KEY] = this.sort;
    this.submitFilter();
  }

  submitFilter() {
    this.filterDataChange.emit(this.filterData);
  }
}
