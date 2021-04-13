import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetManagementComponent } from './asset-management.component';
import { AssetCategoryComponent, MyAssetMakeComponent, MyAssetModelComponent, MyAssetSubTypeComponent, MyAssetTypeComponent } from './pages/asset-category/asset-category.component';

const routes: Routes = [
  {
    path: '',
    component: AssetManagementComponent,
    children: [
      {
        path: 'category',
        component: AssetCategoryComponent,
      },
      {
        path: 'type',
        component: MyAssetTypeComponent,
      },
      {
        path: 'types/:id/subtypes',
        component: MyAssetSubTypeComponent,
      },
      {
        path: 'makes',
        component: MyAssetMakeComponent,
      },
      {
        path: 'makes/:id/models',
        component: MyAssetModelComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
