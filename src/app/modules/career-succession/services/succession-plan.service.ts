import {createSubscription, FAKER_CONFIG, IFaker, MessageOut, myClassFaker, myPropertyFaker} from './base';
import { Injectable } from '@angular/core';
import { Employee } from 'app/_services/service-proxies';
import { MyEmployeeDatail } from './employees.service';

@myClassFaker
export class MySuccessionPlan implements IFaker {
  getFake() {
    return this;
  }
  @myPropertyFaker(FAKER_CONFIG.words, {})
  title: string;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  purpose: string;
  @myPropertyFaker(FAKER_CONFIG.number, {})
  // employee_id: number;
  @myPropertyFaker(FAKER_CONFIG.object, {array: true, class: MyEmployeeDatail})
  employee: Employee[];
}

@myClassFaker
export class SuccessionPlanEmployee implements IFaker{
  getFake() {
    return this;
  }

  @myPropertyFaker(FAKER_CONFIG.number, {})
  employee_id: number;
  @myPropertyFaker(FAKER_CONFIG.object, {class: MyEmployeeDatail})
  employee: MyEmployeeDatail;
  @myPropertyFaker(FAKER_CONFIG.words, {})
  readiness_to_start: string;

  get name() {
    return this.employee.employee_name;
  }

  get position() {
    return this.employee.position_name;
  }

  get department() {
    return this.employee.department_name;
  }
}


@Injectable({
  providedIn: 'root'
})
export class SuccessionPlanService {

  constructor() { }

  list() {
    const data = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => new MySuccessionPlan().getFake()),
      length: 10,
    };
    return createSubscription(data);
  }

  create(data: MySuccessionPlan) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
  }

  fetch(id) {
    return createSubscription(new MySuccessionPlan().getFake());
  }

  getEmployees(id) {
    return createSubscription({
      data: [1, 2, 3, 4, 5].map(_id => new SuccessionPlanEmployee().getFake()),
      length: 5,
    });
  }

  addEmployeeToPlan(plan: MySuccessionPlan, employee: SuccessionPlanEmployee) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
  }

  removeEmployeeFromPlan(plan: MySuccessionPlan, employee: SuccessionPlanEmployee) {
    if (fakerStatic.random.boolean()) {
      return createSubscription(new MessageOut('Talent Pool created successfully', true));
    }
    return createSubscription(new MessageOut('Error while creating talent pool', false));
  }
}
