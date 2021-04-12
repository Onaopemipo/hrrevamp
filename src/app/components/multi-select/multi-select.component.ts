import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartmentsService } from 'app/modules/module-settings/services/departments.service';
import { LocationService } from 'app/modules/module-settings/services/location.service';
import { PositionService } from 'app/modules/module-settings/services/position.service';
import { TrainingCategoryService } from 'app/modules/training/services/training-category.service';
import { TrainingSpecializationService } from 'app/modules/training/services/training-specialization.service';
import { TypesService } from 'app/modules/training/services/types.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

export enum ChoiceName {
  trainingCategory,
  trainingSpecialization,
  trainingType,
  departments,
  positions,
  locations,
  units,
}
@Component({
  selector: 'ngx-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() set value(val) {
    this.selectedItems = val;
  }
  @Input() set idValue(val){

  }
  @Output() idValueChange = new EventEmitter();

  @Output() valueChange = new EventEmitter();
  @Input() choice_name: ChoiceName = null;
  @Input() singleSelection = true;
  _items: any[] = [];
  get items(): any[] {
    return this._items;
  }
  @Input() set items(val: any[]) {
    this._items = val;
    this.dropdownList = this.items;
    this.dropdownSettings = {
      singleSelection: this.singleSelection,
      idField: 'name',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  };

  constructor(
    private trainingCategoryService: TrainingCategoryService,
    private trainingSpecializationService: TrainingSpecializationService,
    private trainingTypeService: TypesService,
    private locationService: LocationService,
    private departmentService: DepartmentsService,
    private positionService: PositionService,
  ) {}

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  async ngOnInit() {
    console.log(this.choice_name);
    if (this.choice_name === null) {
      this.dropdownList = [
        { item_id: 1, item_text: 'Mumbai' },
        { item_id: 2, item_text: 'Bangaluru' },
        { item_id: 3, item_text: 'Pune' },
        { item_id: 4, item_text: 'Navsari' },
        { item_id: 5, item_text: 'New Delhi' }
      ];
      this.selectedItems = [
        { item_id: 3, item_text: 'Pune' },
        { item_id: 4, item_text: 'Navsari' }
      ];
      this.dropdownSettings = {
        singleSelection: this.singleSelection,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
    } else {
      const config = {};
      console.log(1);
      config[ChoiceName.trainingCategory] = this.trainingCategoryService;
      config[ChoiceName.trainingSpecialization] = this.trainingSpecializationService;
      config[ChoiceName.trainingType] = this.trainingTypeService;
      config[ChoiceName.locations] = this.locationService;
      config[ChoiceName.departments] = this.departmentService;
      config[ChoiceName.positions] = this.positionService;
      this.dropdownList = (await config[this.choice_name].list({}).toPromise()).data;
      console.log(this.dropdownList)
      //1 this.dropdownList = (await this.trainingSpecializationService.list({}).toPromise()).data;
      this.dropdownSettings = {
        singleSelection: this.singleSelection,
        idField: 'selectValue',
        textField: 'selectLabel',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
    }
    if (this.items) {
      this.dropdownList = this.items;
      this.dropdownSettings = {
        singleSelection: this.singleSelection,
        idField: 'name',
        textField: 'label',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
    }
  }
  onItemSelect(item: any) {
    console.log(item);
    this.valueChange.emit(this.selectedItems);
    const idValues = this.selectedItems.map(data => data[this.dropdownSettings.idField]);
    if (this.singleSelection) {
      this.idValueChange.emit(idValues.length > 0 ? idValues[0] : null);
    } else {
      this.idValueChange.emit(idValues);
    }
  }
  onSelectAll(items: any) {
    console.log(items);
    this.valueChange.emit(this.selectedItems);
  }
}
