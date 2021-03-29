import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Observable, Subject } from 'rxjs';
import * as fakerStatic from 'faker';
import { Employee } from 'app/_services/service-proxies';
import { createSubscription, MessageOut, randomEnumValue } from './base';
import { MyEmployeeDatail } from './employees.service'
import { Transfer } from '@flowjs/ngx-flow';

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
  category: string;
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

  constructor(){
    this.employees = [];
    this.requirements = [];
  }

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
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  file: Transfer;
  position: string;

  fake(id, channel=randomEnumValue(EmployeeChannelEnum)) {
    this.channel = channel as any;
    this.employee_id = 1;
    this.employee = new MyEmployeeDatail({}).fake(1);
    this.name = fakerStatic.name.findName() + ' ' + fakerStatic.name.firstName();
    this.email = fakerStatic.name.firstName() + '@gmail.com';
    this.phone = '0804234232';
    this.website = 'http://' + fakerStatic.name.firstName() + '.com';
    this.linkedin = 'http://linkedin.com/' + fakerStatic.name.firstName();
    return this;
  }
}

export interface ITalentPoolEmployeeFilter {
  channel?: EmployeeChannelEnum;
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
    const data = new MyTalentPool().fake(id);
    return createSubscription(data);
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

  fetchEmployees(id, filter: ITalentPoolEmployeeFilter) {
    const data: ListResult<MyTalentPoolEmployee> = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(pool_id => new MyTalentPoolEmployee().fake(pool_id, filter.channel)),
      length: 10
    };
    return createSubscription(data);
  }
  addRequirementToPool(pool: MyTalentPool, requirement: MyTalentPoolRequirement) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
  }

  removeRequirementFromPool(pool: MyTalentPool, requirement: MyTalentPoolRequirement) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
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

  getRequirementTypes(){
    return createSubscription([
      {name: TalentPoolRequirementTypes.qualification, label: 'Qualification'},
      {name: TalentPoolRequirementTypes.certification, label: 'Certification'},
      {name: TalentPoolRequirementTypes.skill, label: 'Skill'},
      {name: TalentPoolRequirementTypes.ability, label: 'Ability'},
      {name: TalentPoolRequirementTypes.experience, label: 'Experience'},
    ]);
  }
}
