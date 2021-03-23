import { Injectable } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { AddUpdateJobRolesServiceProxy, DeleteJobRoleServiceProxy, GetAllJobRolesServiceProxy, JobRole, JobRolesDTO, ManageJobRoleDTO } from 'app/_services/service-proxies';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyJobRole extends JobRolesDTO  implements IStatus{
  amount: number;
  parentPositionId: number;
  constructor(role: JobRolesDTO = new JobRolesDTO()) {
    super(role);
    Object.assign(this, role);
  }

  getStatusColor() {
    return new MyColor(200, 100, 10);
  }
  getStatusLabel() {
    return 'Active';
  }

  toManage() {
    return new ManageJobRoleDTO({...this, amount: this.amount, parentPositionId: this.parentPositionId});
  }
}

export class JobRoleFilter {
  page?: number;
}
@Injectable({
  providedIn: 'root'
})
export class JobRoleService extends CrudService<JobRoleFilter, MyJobRole, MyJobRole>{
  list(filter: JobRoleFilter): Observable<ListResult<MyJobRole>> {
    return this.list_api.getAllJobRoles(10, filter.page).pipe(map(res => {
      return {
        data: res.result.map(role => new MyJobRole(role)),
        length: res.totalCount
      };
    }));
  }
  fetch(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  create(data: MyJobRole): Observable<any> {
    console.log(data);
    return this.create_api.addUpdateJobRoles(data.toManage());
  }
  delete(id: number): Observable<any> {
    return this.delete_api.deleteJobRole(id);
  }

  constructor(
    private list_api: GetAllJobRolesServiceProxy,
    private create_api: AddUpdateJobRolesServiceProxy,
    private delete_api: DeleteJobRoleServiceProxy,
  ) {
    super();
  }
}
