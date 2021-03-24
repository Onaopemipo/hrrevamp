import { Injectable } from '@angular/core';
import { CrudService, ListResult } from 'app/_services/base-api.service';
import { Observable, Subject } from 'rxjs';
import * as fakerStatic from 'faker';

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
  employees: EmployeeName[];
  requirements: MyTalentPoolRequirement[];

  fake(id) {
    this.id = id;
    this.title = fakerStatic.name.title();
    this.description = fakerStatic.lorem.sentence();
    this.requirements = [1, 2, 3, 4, 5, 6].map(employee => new MyTalentPoolRequirement().fake(id));
    this.employees = [1, 2, 3, 4, 5, 6, 7, 9, 10].map(employee_id => new EmployeeName().fake(employee_id));
    return this;
  }
}

export class TalentPoolFilter {

}
class MessageOut {
  isSuccessful: boolean;
  message: string;
  redirectUrl: string;
  retId: 0;

  constructor(message, isSuccesful) {
    this.message = message;
    this.isSuccessful = isSuccesful;
  }
}
function createSubscription<T>(data: T) {
  const subject = new Subject<T>();
  window.setTimeout(() => {
    subject.next(data);
    subject.complete();
  }, 1000);
  return subject.asObservable();
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

}
