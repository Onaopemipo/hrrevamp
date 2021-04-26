import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { AssetManagementComponent } from './asset-management.component';
import { AssetCategoryComponent, MyAssetMakeComponent, MyAssetModelComponent, MyAssetStatusComponent, MyAssetSubTypeComponent, MyAssetTypeComponent } from './pages/asset-category/asset-category.component';
import { AssetTypeComponent } from './pages/asset-type/asset-type.component';
import { AssetSubTypeComponent } from './pages/asset-sub-type/asset-sub-type.component';
import { AssetRequestComponent } from './pages/asset-request/asset-request.component';
import { AssetListComponent } from './pages/asset-list/asset-list.component';
import { ComponentsModule } from 'app/components/components.module';
import { AssetCategoryService, AssetMakeService, AssetModelService, AssetStatusService, AssetSubTypeService, AssetTypeService } from './services/asset-category.service';
import { AssetManagementServiceProxy } from 'app/_services/service-proxies';
import { ThemeModule } from 'app/@theme/theme.module';
import { AssetListService } from './services/asset-list.service';


@NgModule({
  declarations: [
    AssetManagementComponent,
    AssetCategoryComponent,
    AssetTypeComponent,
    AssetSubTypeComponent,
    AssetRequestComponent,
    AssetListComponent,
    MyAssetTypeComponent,
    MyAssetSubTypeComponent,
    MyAssetMakeComponent,
    MyAssetModelComponent,
    MyAssetStatusComponent,
  ],
  providers: [
    AssetCategoryService,
    AssetTypeService,
    AssetSubTypeService,
    AssetMakeService,
    AssetModelService,
    AssetStatusService,
    AssetManagementServiceProxy,
    AssetListService,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AssetManagementRoutingModule,
    ThemeModule,
  ]
})
export class AssetManagementModule { }
