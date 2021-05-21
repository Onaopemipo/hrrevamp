import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { createSubscription, MessageOut } from 'app/modules/career-succession/services/base';
import { ListResult } from 'app/_services/base-api.service';
import { AssetDTO, AssetManagementServiceProxy, AssetRequestDTO, IState } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssetBaseService } from './asset-category.service';


export class MyAssetRequest extends AssetRequestDTO implements IStatus{
  constructor(data = new AssetRequestDTO()) {
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
export class AssetRequesrService extends AssetBaseService<MyAssetRequest, any> {
  list_api(filter: any) {
    return this.api.getActivateAsset(1, 10, '', false, false);
  }
  toData(obj: MyAssetRequest): MyAssetRequest {
    return new MyAssetRequest();
  }
  list(filter: any): Observable<ListResult<MyAssetRequest>> {
    // console.log('aaa');
    // return this.list_api(filter).pipe(map(res => {
    //   console.log(res);
    //   return {
    //     data: res.result.map(obj => this.toData(obj)),
    //     length: res.totalCount,
    //   };
    // }));
    throw('');
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyAssetRequest) {
    return this.api.addAssetRequest(data);
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

