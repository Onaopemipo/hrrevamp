import { D } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/components/base/base.component';
import { FormConfig, FORM_TYPES } from 'app/components/custom-form/custom-form.component';
import { ChoiceName } from 'app/components/multi-select/multi-select.component';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ListResult } from 'app/_services/base-api.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { AssetDTO } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { AssetApiModelClass, AssetBaseService, AssetCategoryService, AssetSubTypeService, AssetTypeService, MyAssetCategory, MyAssetCategoryFilter, MyAssetSubTypeFilter, MyAssetSubType, AssetMakeService, MyAssetModelFilter, MyAssetModel, AssetModelService, AssetStatusService } from '../../services/asset-category.service';
import { AssetListService } from '../../services/asset-list.service';
import { AssetBaseComponent } from '../asset-category/asset-category.component';

@Component({
  selector: 'ngx-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent extends AssetBaseComponent<any, any>{
  constructor(
    protected api: AssetListService,
    protected confirmBoxService: ConfirmBoxService,
    protected alertService: AlertserviceService,
  ) {
    super(confirmBoxService);
  }
  objectName = 'Asset';
  getTableColumns(): TableColumn[] {
    return [
      {name: 'name', title: 'Name'},
      {name: 'dateCreated', title: 'Date Modified', type: ColumnTypes.Date},
      {name: 'name', title: 'Status', type: ColumnTypes.Status},
    ];
  }
  formConfig = {
    fields: [
      {name: 'name', label: 'Name', type: FORM_TYPES.text},
      {name: 'referenceNumber', label: 'Reference Number', type: FORM_TYPES.text},
      {name: 'serialNumber', label: 'Serial Number', type: FORM_TYPES.text},
      {name: 'description', label: 'Description', type: FORM_TYPES.wysiwyg},
      {name: 'assetCategoryId', label: 'assetCategoryId', type: FORM_TYPES.number},
      {name: 'assetMakeId', label: 'Make', type: FORM_TYPES.number},
      {name: 'assetModelId', label: 'Model', type: FORM_TYPES.number},
      {name: 'assetTypeId', label: 'Type', type: FORM_TYPES.number},
      {name: 'assetSubTypeId', label: 'SubType', type: FORM_TYPES.number},
      {name: 'assetStatusId', label: 'Status', type: FORM_TYPES.number},
      {name: 'manufactureDate', label: 'Manufacture Date', type: FORM_TYPES.date},
      {name: 'purchaseDate', label: 'Purchase Date', type: FORM_TYPES.date},
      {name: 'depreciationDate', label: 'Depreciation Date', type: FORM_TYPES.date},
      {name: 'purchaseAmount', label: 'Purchase Amount', type: FORM_TYPES.number},
      {name: 'barCode', label: 'Bar Code', type: FORM_TYPES.text},
      {name: 'qrCode', label: 'QR Code', type: FORM_TYPES.text},
      // {name: 'depreciationProfile', label: 'Depreciation Profile', type: FORM_TYPES.text},
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
  getNewEditingData(): AssetDTO {
    return new AssetDTO();
  }
}