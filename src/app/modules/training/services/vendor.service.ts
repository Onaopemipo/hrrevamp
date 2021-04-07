import { Injectable } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { FileParameter, TrainingServiceProxy, TrainingVendor } from 'app/_services/service-proxies';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { extend } from 'validate.js';

export class MyVendor extends TrainingVendor{
  contactPerson: string;
  uploadFile: Transfer;
  constructor(vendor: TrainingVendor = new TrainingVendor()) {
    super(vendor);
  }
  toJSON() {
    const data = super.toJSON();
    data['contactPerson'] = this.contactPerson;
    return data;
  }
  clone() {
    return new MyVendor(this);
  }
}

export class VendorFilter{
  name?: string;
  specializationId?: number;
  trainingTag?: string;
}

@Injectable()
export class VendorService extends CrudService<MyVendor, {}, MyVendor> {
  public constructor(private api: TrainingServiceProxy) {
    super();
  }

  list(filter: VendorFilter) {
    return this.api.vendors(filter.name, filter.specializationId, filter.trainingTag).pipe(map(res => {
      // const data: ListResult<MyVendor> = {
      //   data: [],
      //   length: 0,
      // }
      return {
        data: res.result.map(vendor => new MyVendor(vendor)),
        length: res.totalCount
      };
    }));
  }

  create(vendor: MyVendor) {
    console.log(vendor);
    return this.api.createvendor(vendor);
  }

  upload(file: FileParameter) {
    return this.api.uploadVendor(file);
  }

  delete() {
    return of({data: [], length: 0});
  }

  fetch() {
    return of({data: [], length: 0});
  }
}
