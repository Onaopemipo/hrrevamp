import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { createSubscription, MessageOut } from 'app/modules/career-succession/services/base';
import { ListResult } from 'app/_services/base-api.service';
import { AssetDTO, AssetManagementServiceProxy, IState } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssetBaseService } from './asset-category.service';

export class MyAsset extends AssetDTO implements IStatus{
  constructor(data = new AssetDTO()) {
    super(data);
  }
  getStatusLabel(): string {
    return 'Active';
  }
  getStatusColor(): MyColor {
    return new MyColor(200, 200, 200);
  }

  toManage() {
    return this;
  }

  public getFake() {
    return this;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetListService  extends AssetBaseService<MyAsset, any> {
  list_api(filter: any) {
    return this.api.getActivateAsset(1, 10, '', false, false);
  }
  toData(obj: AssetDTO): MyAsset {
    return new MyAsset(obj);
  }
  list(filter: any): Observable<ListResult<MyAsset>> {
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
  create(data: MyAsset) {
    return this.api.addAsset(new AssetDTO({...data, ...{
      "referenceNumber": "string",
      "employeeFullName": "string",
      "modelName": "string",
      "depreciationName": "string",
      "assetTypeName": "string",
      "assetSubTypeName": "string",
      "statusName": "string",
      "locationName": "string",
      "makeName": "string",
      "assetid": 0,
      "assignedEmployeeid": 0,
      "name": "string",
      "assetNumber": "string",
      "serialNumber": "string",
      "custodianDepartmentId": 0,
      "custodianId": 0,
      "assetStatusId": 0,
      "assetCategoryId": 3,
      "assetSubTypeId": 3,
      "deperciationMethod": 0,
      "depreciationFrequency": 0,
      "createdBy": "string",
      "assetTypeId": 0,
      "assetModelId": 2,
      "assetModelName": "string",
      "assetDepreciationProfileId": 2,
      "assetMakeId": 2,
      "assetMakeName": "string",
      "locationId": 0,
      "manufactureDate": new Date(),
      "purchaseDate": new Date(),
      "purchaseAmount": 0,
      "description": "string",
      "barCode": "string",
      "qrCode": "string",
      "depreciationDate": new Date(),
      "lostAsset": true,
      "id": 0,
      "companyID": 0,
      "subID": 0,
      "dateCreated": new Date(),
      "isDeleted": true,
      "isActive": true
    },
    ...data
    }));
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

