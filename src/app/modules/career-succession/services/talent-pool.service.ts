import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Observable, Subject } from 'rxjs';
import * as fakerStatic from 'faker';
import { Employee } from 'app/_services/service-proxies';
import { createSubscription, MessageOut } from './base';
import { MyEmployeeDatail } from './employees.service'

export class EmployeeName {
  name: string;
  id: string;

  fake(id) {
    this.id = id;
    this.name = fakerStatic.name.findName() + ' ' + fakerStatic.name.findName();
    return this;
  }
}

export enum TalentPoolRequirementTypes {
  qualification, certification, skill, ability, experience
}
export class MyTalentPoolRequirement {
  id: number;
  type: TalentPoolRequirementTypes;
  requirementPoint: number;
  skillWeight: number;
  experience: number;
  experienceWeight: number;

  fake(id) {
    this.id = id;
    this.type = TalentPoolRequirementTypes.ability;
    this.requirementPoint = fakerStatic.random.number(10);
    this.skillWeight = fakerStatic.random.number(10);
    this.experience = fakerStatic.random.number(10);
    this.experienceWeight = fakerStatic.random.number(10);
    return this;
  }
}

export class MyTalentPool {
  id: number;
  title: string;
  description: string;
  no_of_employees: number;
  employees: EmployeeName[];
  requirements: MyTalentPoolRequirement[];

  fake(id) {
    this.id = id;
    this.title = fakerStatic.name.title();
    this.description = fakerStatic.lorem.sentence();
    this.requirements = [1, 2, 3, 4, 5, 6].map(employee => new MyTalentPoolRequirement().fake(id));
    this.employees = [1, 2, 3, 4, 5, 6, 7, 9, 10].map(employee_id => new EmployeeName().fake(employee_id));
    this.no_of_employees = fakerStatic.random.number();
    return this;
  }
}

export class TalentPoolFilter {

}


export enum EmployeeChannelEnum {
  employeeDatabase, recruitmentDatabase, externalSource
}

export class MyTalentPoolEmployee {
  channel: EmployeeChannelEnum;
  purpose: string;
  name: string;
  employee_id: number;
  employee: MyEmployeeDatail;
  department: string;
  position: string;

  fake(id) {
    this.channel = EmployeeChannelEnum.employeeDatabase;
    this.employee_id = 1;
    this.employee = new MyEmployeeDatail().fake(1);
    return this;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TalentPoolService extends CrudService<TalentPoolFilter, MyTalentPool, MyTalentPool> {
  list(filter: TalentPoolFilter): Observable<ListResult<MyTalentPool>> {
    const data: ListResult<MyTalentPool> = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => new MyTalentPool().fake(id)),
      length: 10
    };
    return createSubscription(data);
  }
  fetch(id: number) {
    throw new Error('Method not implemented.');
  }
  create(data: MyTalentPool) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
  }
  delete(id: number) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool ddeleted successfully', true));
    }
    return createSubscription(new MessageOut('Error while deleting talent pool', false));
  }

  fetchEmployees(id) {
    const data: ListResult<MyTalentPoolEmployee> = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(pool_id => new MyTalentPoolEmployee().fake(pool_id)),
      length: 10
    };
  }

  addToPool(id: number, employee: MyTalentPoolEmployee) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
  }

  removeFromTalentPool(id: number, employee: MyTalentPoolEmployee) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
  }
}
