import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartmentsService } from 'app/modules/module-settings/services/departments.service';
import { LocationService } from 'app/modules/module-settings/services/location.service';
import { TrainingCategoryService } from 'app/modules/training/services/training-category.service';
import { TrainingSpecializationService } from 'app/modules/training/services/training-specialization.service';
import { TypesService } from 'app/modules/training/services/types.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

export enum ChoiceName {
  trainingCategory,
  trainingSpecialization,
  trainingType,
  departments,
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

  @Output() valueChange = new EventEmitter();
  @Input() choice_name: ChoiceName = null;
  @Input() singleSelection = true;

  constructor(
    private trainingCategoryService: TrainingCategoryService,
    private trainingSpecializationService: TrainingSpecializationService,
    private trainingTypeService: TypesService,
    private locationService: LocationService,
    private departmentService: DepartmentsService,
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
        allowSearchFilter: true
      };
    } else {
      const config = {};
      console.log(1);
      config[ChoiceName.trainingCategory] = this.trainingCategoryService;
      config[ChoiceName.trainingSpecialization] = this.trainingSpecializationService;
      config[ChoiceName.trainingType] = this.trainingTypeService;
      config[ChoiceName.locations] = this.locationService;
      config[ChoiceName.departments] = this.departmentService;
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
  }
  onItemSelect(item: any) {
    console.log(item);
    this.valueChange.emit(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.valueChange.emit(this.selectedItems);
  }
}