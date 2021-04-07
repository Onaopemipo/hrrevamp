import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AppraisalReviewerListDTO, SubordinateAppraisalsServiceProxy } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyAppraisal implements IStatus{
  getStatusLabel(): string {
    return 'aa';
  }

  getStatusColor(): MyColor {
    return new MyColor(233, 233, 233);
  }

  name: string;
  department: string;
  assigned_kra: string;
  cycle: string;

  public static CreateFromReviewerList(obj: AppraisalReviewerListDTO){
    return new MyAppraisal();
  }
}
export class MyAppraisalFilter {
  cycleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppraisalService extends CrudService<MyAppraisalFilter, MyAppraisal, MyAppraisal> {
  list(filter: MyAppraisalFilter): Observable<ListResult<MyAppraisal>> {
    return this.list_api.subordinateAppraisalLists(filter.cycleId).pipe(map(res => {
      return {
        data: res.result.map(emp => MyAppraisal.CreateFromReviewerList(emp)),
        length: res.totalCount,
      };
    }));
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyAppraisal) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private list_api: SubordinateAppraisalsServiceProxy,
  ) {
    super();
  }
}
