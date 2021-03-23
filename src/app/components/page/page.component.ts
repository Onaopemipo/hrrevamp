import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormConfig } from '../custom-form/custom-form.component';

@Component({
  selector: 'ngx-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  data = {};
  @Input() pageTitle = 'Name';

  @Input() set value(val: object) {
    this.data = val;
  }

  @Output() valueChange = new EventEmitter<object>();

  @Input() requiredButton = [{name: 'newTraining', label: 'New Training Plan', icon: 'plus'}];
  @Output() topActionClicked = new EventEmitter<string>();
  @Input() tabs = [
    {label: 'A', name: 'a'},
    {label: 'B', name: 'a'},
    {label: 'C', name: 'a'}
  ];

  @Input() tableColumns = [];
  @Input() tableData: [] = [];

  @Input() formConfig: FormConfig = {
    fields: [],
  };

  @Input() formTitle = '';
  @Input() loadingSave = false;
  @Output() formCompleted = new EventEmitter<object>();
  @Output() formCancelled = new EventEmitter<object>();
  // get showModal() {
  //   return true;
  // }

  _showModal = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Input() set showModal(val: boolean) {
    this._showModal = val;
    this.showModalChange.emit(val);
  }
  get showModal() {
    return this._showModal;
  }

  dataChanged(val: object) {
    this.valueChange.emit(val);
    this.formCompleted.emit({});
  }

  onFormCancelled() {
    this.formCancelled.emit({});
  }

  constructor() { }

  ngOnInit(): void {
  }

  topActionButtonClicked(event) {
    this.topActionClicked.emit(event);
  }
}
