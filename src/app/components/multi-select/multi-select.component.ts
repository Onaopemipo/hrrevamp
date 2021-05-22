import { map } from 'rxjs/operators';
import { CommonServiceProxy, DataServiceProxy } from './../../_services/service-proxies';
import { CommonService } from './../../services/common.service';
import { MyPayrollInstitutionService, MyPayrollTypeService } from './../../modules/payroll/services/common.service';
import { Component, EventEmitter, Input, OnInit, Output, Injectable } from '@angular/core';
import { AssetCategoryService, AssetMakeService, AssetModelService, AssetSubTypeService, AssetTypeService } from 'app/modules/asset-management/services/asset-category.service';
import { ExpenseGroupService, ExpenseProjectActivityService, ExpenseProjectService, ExpenseSubTypeService, ExpenseTypeService } from 'app/modules/expense/services/expense-group.service';
import { DepartmentsService } from 'app/modules/module-settings/services/departments.service';
import { JobRoleService } from 'app/modules/module-settings/services/job-role.service';
import { LocationService } from 'app/modules/module-settings/services/location.service';
import { PositionService } from 'app/modules/module-settings/services/position.service';
import { TrainingCategoryService } from 'app/modules/training/services/training-category.service';
import { TrainingSpecializationService } from 'app/modules/training/services/training-specialization.service';
import { TypesService } from 'app/modules/training/services/types.service';
import { VendorService } from 'app/modules/training/services/vendor.service';
import { CertificationService, PayElementCategoriesService, PayrollFrequencyRuleService, QualificationService } from 'app/_services/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

class MyDropDownValue{
  id: number;
  value: string;
  constructor(id: number, value: string){
    this.id = id;
    this.value = value;
  }

  get selectLabel() {
    return this.value;
  }

  get selectValue() {
    return this.id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DropdownByIdService {
  constructor(
    private dataService: DataServiceProxy
  ){}

  getById(id: number){
    return this.dataService.getDropDownValuesById(id).pipe(map(res => {
      return res.result.map(data => {
        return new MyDropDownValue(data.option_value, data.option_text);
      })
    }))
  }
}

export enum ChoiceName {
  trainingCategory,
  trainingSpecialization,
  trainingVendor,
  trainingType,
  departments,
  positions,
  locations,
  units,
  jobRoles,
  certifications,
  qualifications,
  skills,
  payrollFrequencies,
  payrollElementCategories,
  payrollInstitutions,
  payrollTypes,
  assetCategories,
  assetTypes,
  assetSubTypes,
  assetMakes,
  assetModels,
  expenseGroup,
  expenseType,
  expenseSubType,
  expenseProject,
  expenseProjectActivity,
  banks,
  dataDropdown,
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
  @Input() set idValue(val) {

  }
  @Output() idValueChange = new EventEmitter();

  @Input() multiIdValue(val) { }
  @Output() multiIdValueChange = new EventEmitter<string>();

  @Input() dropdown_id = 0;
  @Output() valueChange = new EventEmitter();
  @Input() choice_name: ChoiceName = null;
  @Input() singleSelection = true;
  _items: any[] = [];
  get items(): any[] {
    return this._items;
  }
  @Input() set items(val: any[]) {
    this._items = val;
    if (this.choice_name === null) {
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

  constructor(
    private trainingCategoryService: TrainingCategoryService,
    private trainingSpecializationService: TrainingSpecializationService,
    private vendorService: VendorService,
    private trainingTypeService: TypesService,
    private locationService: LocationService,
    private departmentService: DepartmentsService,
    private positionService: PositionService,
    private jobRoleService: JobRoleService,
    private certificationService: CertificationService,
    private qualificationService: QualificationService,
    private payrollFrequencyService: PayrollFrequencyRuleService,
    private payrollElementCategoryService: PayElementCategoriesService,
    private payrollInstitutionService: MyPayrollInstitutionService,
    private payrollTypeService: MyPayrollTypeService,
    private assetCategoryService: AssetCategoryService,
    private assetTypeService: AssetTypeService,
    private assetSubTypeService: AssetSubTypeService,
    private assetMakeService: AssetMakeService,
    private assetModelService: AssetModelService,
    private expenseGroupService: ExpenseGroupService,
    private expenseTypeService: ExpenseTypeService,
    private expenseSubTypeService: ExpenseSubTypeService,
    private expenseProjectService: ExpenseProjectService,
    private expenseProjectActivityService: ExpenseProjectActivityService,
    private dropdownByIdService: DropdownByIdService,
  ) {}

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  async ngOnInit() {
    console.log(this.choice_name);
    if (this.choice_name === null) {
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
      } else {
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
      }
    } else {
      const config = {};
      console.log(1);
      config[ChoiceName.trainingCategory] = this.trainingCategoryService;
      config[ChoiceName.trainingSpecialization] = this.trainingSpecializationService;
      config[ChoiceName.trainingType] = this.trainingTypeService;
      config[ChoiceName.locations] = this.locationService;
      config[ChoiceName.departments] = this.departmentService;
      config[ChoiceName.positions] = this.positionService;
      config[ChoiceName.trainingVendor] = this.vendorService;
      config[ChoiceName.jobRoles] = this.jobRoleService;
      config[ChoiceName.certifications] = this.certificationService;
      config[ChoiceName.qualifications] = this.qualificationService;
      config[ChoiceName.payrollFrequencies] = this.payrollFrequencyService;
      config[ChoiceName.payrollInstitutions] = this.payrollInstitutionService;
      config[ChoiceName.payrollElementCategories] = this.payrollElementCategoryService;
      config[ChoiceName.payrollTypes] = this.payrollTypeService;
      config[ChoiceName.assetCategories] = this.assetCategoryService;
      config[ChoiceName.assetMakes] = this.assetMakeService;
      config[ChoiceName.assetModels] = this.assetModelService;
      config[ChoiceName.assetTypes] = this.assetTypeService;
      config[ChoiceName.assetSubTypes] = this.assetSubTypeService;
      config[ChoiceName.expenseGroup] = this.expenseGroupService;
      config[ChoiceName.expenseType] = this.expenseTypeService;
      config[ChoiceName.expenseSubType] = this.expenseSubTypeService;
      config[ChoiceName.expenseProject] = this.expenseProjectService;
      config[ChoiceName.expenseProjectActivity] = this.expenseProjectActivityService;
      config[ChoiceName.dataDropdown] = this.dropdownByIdService;
      console.log(111111)
      this.dropdownList = this.dropdown_id ? await this.dropdownByIdService.getById(this.dropdown_id).toPromise() : (await config[this.choice_name].list({}).toPromise()).data;
      console.log('aaa', this.dropdownList, this.choice_name, config[this.choice_name]);
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
    this.valueChange.emit(this.selectedItems);
    const idValues = this.selectedItems.map(data => data[this.dropdownSettings.idField]);
    if (this.singleSelection) {
      this.idValueChange.emit(idValues.length > 0 ? idValues[0] : null);
    } else {
      console.log(idValues);
      this.idValueChange.emit(idValues);
      this.multiIdValueChange.emit(idValues.join(','))
    }
  }
  onSelectAll(items: any) {
    this.valueChange.emit(this.selectedItems);
    const idValues = this.selectedItems.map(data => data[this.dropdownSettings.idField]);
    if (this.singleSelection) {
      this.idValueChange.emit(idValues.length > 0 ? idValues[0] : null);
    } else {
      console.log(idValues);
      this.idValueChange.emit(idValues);
    }
  }
}
