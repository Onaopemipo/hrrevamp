import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService, ListResult } from './base-api.service';
import { Certification, CertificationDTO, CommonServiceProxy, FrequencyRule, Qualification } from './service-proxies';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
}

class MyCertification extends Certification {
  get selectValue() {
    return this.id;
  }

  get selectLabel() {
    // console.log(this);
    return this.name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CertificationService extends CrudService<{}, {}, MyCertification> {
  list(filter: {}): Observable<ListResult<MyCertification>> {
    return this.common.getCertifications().pipe(map(res => {
      return {
        data: res.result.map(data => new MyCertification(data)),
        length: res.totalRecord
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: {}) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private common: CommonServiceProxy
  ) {
    super();
  }
}

class MyQualification extends Qualification {
  get selectValue() {
    return this.id;
  }

  get selectLabel() {
    // console.log(this);
    return this.name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends CrudService<{}, {}, MyQualification> {
  list(filter: {}): Observable<ListResult<MyQualification>> {
    return this.common.getQualifications().pipe(map(res => {
      return {
        data: res.result.map(data => new MyQualification(data)),
        length: res.totalRecord
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: {}) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private common: CommonServiceProxy
  ) {
    super();
  }
}

class MyPayrollFrequencies extends FrequencyRule {
  get selectValue() {
    return this.id;
  }

  get selectLabel() {
    // console.log(this);
    return this.name;
  }
}

interface ICommon{
  id: number;
  name: string;
}
class CommonObject implements ICommon{
  id: number;
  name: string;
  constructor(obj: ICommon) {
    this.id = obj.id;
    this.name = obj.name;
  }

  get selectValue() {
    return this.id;
  }

  get selectLabel() {
    // console.log(this);
    return this.name;
  }

}

@Injectable({
  providedIn: 'root'
})
export class PayrollFrequencyRuleService extends CrudService<{}, {}, MyPayrollFrequencies> {
  list(filter: {}): Observable<ListResult<MyPayrollFrequencies>> {
    return this.common.getFrequencies().pipe(map(res => {
      return {
        data: res.result.map(data => new MyPayrollFrequencies(data)),
        length: res.totalRecord
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: {}) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private common: CommonServiceProxy
  ) {
    super();
  }
}

@Injectable({
  providedIn: 'root'
})
export class PayElementCategoriesService extends CrudService<{}, {}, CommonObject> {
  list(filter: {}): Observable<ListResult<CommonObject>> {
    return this.common.getElementCategories().pipe(map(res => {
      return {
        data: res.result.map(data => new CommonObject(data)),
        length: res.totalRecord
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: {}) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private common: CommonServiceProxy
  ) {
    super();
  }
}
