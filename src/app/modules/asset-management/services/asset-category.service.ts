import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { createSubscription, FAKER_CONFIG, getCreateResponse, IFaker, MessageOut, myClassFaker, myPropertyFaker } from 'app/modules/career-succession/services/base';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AssetCategoryDTO, AssetDTO, AssetManagementServiceProxy, AssetModelDTO, AssetStatusDTO, AssetSubTypeDTO } from 'app/_services/service-proxies';
import { date } from 'faker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooleanLiteral } from 'typescript';
import { extend } from 'validate.js';

export abstract class AssetApiModelClass<D=any, E=any, F=any>{
  @myPropertyFaker(FAKER_CONFIG.number, {})
  id: number;
  @myPropertyFaker(FAKER_CONFIG.name, {})
  name: string;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  description: string;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  isActive: boolean;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  isDeleted: boolean;
  @myPropertyFaker(FAKER_CONFIG.date, {})
  dateCreated: Date;
  abstract generateEmptyFilter(obj): F;
  abstract fromApi(data: D): AssetApiModelClass;
  abstract toManage(): E;

  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }
  getFake() {
    // throw new Error('Method not implemented.');
    return this;
  }
};

export class MyAssetCategoryFilter {

}

@myClassFaker
export class MyAssetCategory extends AssetApiModelClass<
      AssetCategoryDTO, AssetCategoryDTO,
      MyAssetCategoryFilter> implements IFaker, IStatus {
  generateEmptyFilter(obj: any): MyAssetCategoryFilter {
    return {};
  }

  @myPropertyFaker(FAKER_CONFIG.number, {})
  id: number;
  @myPropertyFaker(FAKER_CONFIG.name, {})
  name: string;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  description: string;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  isActive: boolean;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  isDeleted: boolean;
  @myPropertyFaker(FAKER_CONFIG.date, {})
  dateCreated: Date;

  fromApi(data: AssetCategoryDTO) {
    const category = new MyAssetCategory();
    category.id = data.id;
    category.name = data.name;
    category.description = data.description;
    category.isActive = data.isActive;
    category.isDeleted = data.isDeleted;
    category.dateCreated = data.dateCreated;
    return category;
  }
  toManage(): AssetCategoryDTO {
    return new AssetCategoryDTO({
      id: this.id,
      name: this.name,
      description: this.description,
      dateCreated: new Date(),
      companyID: 0,
      subID: 0,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
    });
  }
}

@myClassFaker
export class MyAssetType extends AssetApiModelClass<
      AssetCategoryDTO, AssetCategoryDTO,
      MyAssetCategoryFilter> implements IFaker, IStatus {
  generateEmptyFilter(obj: any): MyAssetCategoryFilter {
    return {};
  }

  @myPropertyFaker(FAKER_CONFIG.number, {})
  id: number;
  @myPropertyFaker(FAKER_CONFIG.name, {})
  name: string;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  description: string;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  isActive: boolean;
  @myPropertyFaker(FAKER_CONFIG.boolean, {})
  isDeleted: boolean;
  @myPropertyFaker(FAKER_CONFIG.date, {})
  dateCreated: Date;

  fromApi(data: AssetCategoryDTO) {
    const category = new MyAssetCategory();
    category.id = data.id;
    category.name = data.name;
    category.description = data.description;
    category.isActive = data.isActive;
    category.isDeleted = data.isDeleted;
    category.dateCreated = data.dateCreated;
    return category;
  }
  toManage(): AssetCategoryDTO {
    return new AssetCategoryDTO({
      id: this.id,
      name: this.name,
      description: this.description,
      dateCreated: new Date(),
      companyID: 0,
      subID: 0,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
    });
  }
}

export abstract class AssetBaseService<D, F> extends CrudService<F, D, D>  {
  abstract list_api(filter: F): Observable<any>;
  abstract toData(obj: any): D;
  list(filter: F): Observable<ListResult<D>> {
    console.log('aaa');
    return this.list_api(filter).pipe(map(res => {
      console.log(res);
      return {
        data: res.result.map(obj => this.toData(obj)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  abstract create(data: D): Observable<any>;
  abstract delete(id: number): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class AssetCategoryService extends AssetBaseService<MyAssetCategory, MyAssetCategoryFilter> {
  list_api(filter: MyAssetCategoryFilter): Observable<any> {
    return this.api.getAssetCategory(1, 10, '', false, false);
  }
  toData(obj: any): MyAssetCategory {
    return new MyAssetCategory().fromApi(obj);
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyAssetCategory) {
    return this.api.assetCatergory(data.toManage());
  }
  delete(id: number) {
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private api: AssetManagementServiceProxy
  ) {
    super();
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService extends AssetBaseService<MyAssetCategory, MyAssetCategoryFilter> {
  list_api(filter: MyAssetCategoryFilter): Observable<any> {
    console.log(9999)
    // this.api.getAssetCategory(1, 10, '', false, false).subscribe(data => {});
    return this.api.getAssetType(1, 10, '', false, false);
  }
  toData(obj: any): MyAssetCategory {
    return new MyAssetCategory().fromApi(obj);
  }
  // list(filter: MyAssetCategory): Observable<ListResult<MyAssetCategory>> {
  //   console.log(1234)
  //   return this.api.getAssetCategory(1, 10, '', false, false).pipe(map(res => {
  //     return {
  //       data: res.result.map(category => new MyAssetCategory().fromApi(category)),
  //       length: res.totalCount,
  //     };
  //   }));
  // }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyAssetCategory) {
    return this.api.assetType(data.toManage());
  }
  delete(id: number) {
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private api: AssetManagementServiceProxy
  ) {
    super();
  }
}

export class MyAssetSubTypeFilter extends MyAssetCategoryFilter{
  type_id?: number;
}

export class MyAssetSubType extends AssetApiModelClass<
  AssetSubTypeDTO, AssetSubTypeDTO,
  MyAssetSubTypeFilter> {
  generateEmptyFilter(obj: any): MyAssetSubTypeFilter {
    return {};
  }
  assetTypeId: number;
  assetTypeName: string;

  fromApi(data: AssetSubTypeDTO) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.isActive = data.isActive;
    this.isDeleted = data.isDeleted;
    this.dateCreated = data.dateCreated;
    this.assetTypeId = data.assetTypeId;
    // this.assetTypeName = data.assetTypeName;
    return this;
  }
  toManage(): AssetSubTypeDTO {
    console.log(this);
    return new AssetSubTypeDTO({
      id: this.id,
      name: this.name,
      assetTypeName: this.name,
      description: this.description,
      dateCreated: new Date(),
      companyID: 0,
      subID: 0,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
      assetTypeId: this.assetTypeId,
      code: 0,
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetSubTypeService extends AssetBaseService<MyAssetSubType, MyAssetSubTypeFilter> {

  list_api(filter: MyAssetSubTypeFilter): Observable<any> {
    return this.api.getAssetSubType(filter.type_id, 1, 10);
  }

  toData(obj: any): MyAssetSubType {
    return new MyAssetSubType().fromApi(obj);
  }

  fetch(id: number) {
    throw new Error('Method not implemented.');
  }

  create(data: MyAssetSubType) {
    return this.api.assetSubType(data.toManage());
  }

  delete(id: number) {
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private api: AssetManagementServiceProxy
  ) {
    super();
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetMakeService extends AssetBaseService<MyAssetCategory, MyAssetCategoryFilter> {
  list_api(filter: MyAssetCategoryFilter): Observable<any> {
    console.log(9999);
    // this.api.getAssetCategory(1, 10, '', false, false).subscribe(data => {});
    return this.api.getAssetMake(1, 10, '', false, false);
  }
  toData(obj: any): MyAssetCategory {
    return new MyAssetCategory().fromApi(obj);
  }
  // list(filter: MyAssetCategory): Observable<ListResult<MyAssetCategory>> {
  //   console.log(1234)
  //   return this.api.getAssetCategory(1, 10, '', false, false).pipe(map(res => {
  //     return {
  //       data: res.result.map(category => new MyAssetCategory().fromApi(category)),
  //       length: res.totalCount,
  //     };
  //   }));
  // }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyAssetCategory) {
    const obj: any = data.toManage(); //chamge
    return this.api.assetMake(obj);
  }
  delete(id: number) {
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private api: AssetManagementServiceProxy
  ) {
    super();
  }
}

export class MyAssetModelFilter{
  assetMakeId?: number;
}
export class MyAssetModel extends AssetApiModelClass<
  AssetModelDTO, AssetModelDTO,
  MyAssetSubTypeFilter> {
  generateEmptyFilter(obj: any): MyAssetSubTypeFilter {
    return {};
  }
  assetMakeId: number;
  assetTypeName: string;

  fromApi(data: AssetModelDTO) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.isActive = data.isActive;
    this.isDeleted = data.isDeleted;
    this.dateCreated = data.dateCreated;
    this.assetMakeId = data.assetMakeId;
    // this.assetTypeName = data.assetTypeName;
    return this;
  }
  toManage(): AssetModelDTO {
    console.log(this);
    return new AssetModelDTO({
      id: this.id,
      name: this.name,
      description: this.description,
      dateCreated: new Date(),
      companyID: 0,
      subID: 0,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
      assetMakeId: this.assetMakeId,
      assetid: 0,
      modelname: this.name,
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetModelService extends AssetBaseService<MyAssetModel, MyAssetModelFilter> {

  list_api(filter: MyAssetModelFilter): Observable<any> {
    return this.api.getAssetModel(1, 10, '', false, false);
  }

  toData(obj: any): MyAssetModel {
    return new MyAssetModel().fromApi(obj);
  }

  fetch(id: number) {
    throw new Error('Method not implemented.');
  }

  create(data: MyAssetModel) {
    return this.api.assetModel(data.toManage());
  }

  delete(id: number) {
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private api: AssetManagementServiceProxy
  ) {
    super();
  }
}


export class MyAssetFilter{
  assetMakeId?: number;
}
export class MyAsset extends AssetDTO {
  generateEmptyFilter(obj: any): MyAssetFilter {
    return {};
  }
  assetMakeId: number;
  assetTypeName: string;

  fromApi(data: AssetDTO) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.isActive = data.isActive;
    this.isDeleted = data.isDeleted;
    this.dateCreated = data.dateCreated;
    this.assetMakeId = data.assetMakeId;
    // this.assetTypeName = data.assetTypeName;
    return this;
  }
  referenceNumber: string;
  // toManage(): AssetDTO {
  //   console.log(this);
  //   return new AssetDTO({
  //     id: this.id,
  //     name: this.name,
  //     description: this.description,
  //     dateCreated: new Date(),
  //     companyID: 0,
  //     subID: 0,
  //     isActive: this.isActive,
  //     isDeleted: this.isDeleted,
  //     assetMakeId: this.assetMakeId,
  //     assetid: 0,
  //     referenceNumber: this.referenceNumber,
  //     employeeFullName: '',

  //   });
  // };
}

@Injectable({
  providedIn: 'root'
})
export class MyAssetService extends AssetBaseService<MyAssetModel, MyAssetModelFilter> {

  list_api(filter: MyAssetModelFilter): Observable<any> {
    return this.api.getAssetModel(1, 10, '', false, false);
  }

  toData(obj: any): MyAssetModel {
    return new MyAssetModel().fromApi(obj);
  }

  fetch(id: number) {
    throw new Error('Method not implemented.');
  }

  create(data: MyAssetModel) {
    return this.api.assetModel(data.toManage());
  }

  delete(id: number) {
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private api: AssetManagementServiceProxy
  ) {
    super();
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetStatusService extends AssetBaseService<MyAssetCategory, MyAssetCategoryFilter> {
  list_api(filter: MyAssetCategoryFilter): Observable<any> {
    return this.api.getAssetStatus(1, 10, '', false, false);
  }
  toData(obj: any): MyAssetCategory {
    return new MyAssetCategory().fromApi(obj);
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyAssetCategory) {
    return this.api.assetStatus(
      new AssetStatusDTO({...data, assetid: 0, statusName: data.name, companyID: 0, subID: 0})
    );
  }
  delete(id: number) {
    return createSubscription(new MessageOut('Deleted successfully', true));
  }

  constructor(
    private api: AssetManagementServiceProxy
  ) {
    super();
  }
}
