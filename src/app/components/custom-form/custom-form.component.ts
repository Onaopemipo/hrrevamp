import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoiceName } from '../multi-select/multi-select.component';

export enum FORM_TYPES {
  text, amount, number, wysiwyg, select, file, employee, radio,
}

export class FormValidator{
  required: boolean = false;
}

export interface ISelectItem{
  selectValue: any;
  selectLabel: string;
}
export class FormField {
  name: string;
  label: string;
  type: FORM_TYPES;
  validators?: FormValidator;
  optional?: boolean = false;
  placeholder?: string = 'place';
  choice_name?: ChoiceName;
  singleSelection?: boolean = true;
  disabled?: boolean;
  selectOptions?: ISelectItem[];
  hide?: boolean;
}

export class FormConfig {
  fields: FormField[];
}
@Component({
  selector: 'ngx-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {

  FIELD_TYPES = FORM_TYPES;
  data: object = {};
  tempData: object = {};
  errors: Record<string, string[]> = {};
  @Input() formConfig: FormConfig = {
    fields: [
      {name: 'category_name', label: 'Name', type: FORM_TYPES.text}
    ]
  };
  @Input() set value(val: object) {
    this.data = { ...val };
  }
  @Input() loadingSave = false;
  @Output() valueChange = new EventEmitter<object>();
  @Output() onCancel = new EventEmitter();
  @Output() onCompleted = new EventEmitter<object>();

  get formFields() {
    return this.formConfig.fields;
  }
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.data = {};
    this.onCancel.emit();
  }

  validate() {
    return true;
  }

  submitForm() {
    if (this.validate()) {
      this.onCompleted.emit(this.data);
      this.valueChange.emit(this.data);
    }
  }

  employeeChange(field: FormField, event) {
    if (field.singleSelection) {
      this.data[field.name] = event[0];
    } else {
      this.data[field.name] = event;
    }
  }
  selectChange(field: FormField, event) {
    console.log(field, event);
    const ids = event.map(data => data.selectValue);
    if (field.singleSelection) {
      this.data[field.name] = ids[0];
    } else {
      this.data[field.name] = ids;
    }
    console.log(this.data);
  }
}
