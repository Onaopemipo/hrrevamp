import { Injectable } from '@angular/core';
import { Certification, QualificationGrade, Skill } from 'app/_services/service-proxies';
import * as fakerStatic from 'faker';

export class MyEmployeeQualification extends QualificationGrade{
  constructor(obj) {
    super();
    Object.assign(this, obj);
  }

  fake(id) {
    this.id = id;
    const qualifications = ['BSC in engineering', 'MSC in engineering', 'BSC in art'];
    const random = Math.floor(Math.random() * qualifications.length);
    this.name = qualifications[random];
    return this;
  }
}

export class EmployeeCertification extends Certification {
  constructor(obj) {
    super(obj);
    Object.assign(this, obj);
  }

  fake(id) {
    this.id = id;
    const certifications = ['IELTS', 'ISO 222', 'IEEE'];
    const random = Math.floor(Math.random() * certifications.length);
    this.name = certifications[random];
    return this;
  }
}
export class EmployeeAbilities {
  id: number;
  name: string;
  constructor(obj) {}
  fake(id) {
    this.id = id;
    const certifications = ['Ability to create financial reports and audits.', 'Curation of content and materials to fit requirements.', 'Ability to create financial reports and audits.'];
    const random = Math.floor(Math.random() * certifications.length);
    this.name = certifications[random];
    return this;
  }
}
export class EmployeeSkill extends Skill {
  constructor(obj) {
    super(obj);
    Object.assign(this, obj);
  }

  fake(id) {
    this.id = id;
    const certifications = ['FIGMA', 'CSS', 'HTML'];
    const random = Math.floor(Math.random() * certifications.length);
    this.name = certifications[random];
    return this;
  }
}

export class MyEmployeeDatail {
  id: number;
  position_name: string;
  employee_name: string;
  department_name: string;
  unit_name: string;
  level: number;
  location_name: string;

  qualifications?: MyEmployeeQualification[];
  certification?: EmployeeCertification[];
  abilities?: EmployeeAbilities[];
  skills?: EmployeeSkill[];

  fake(id) {
    this.id = id;
    this.position_name = fakerStatic.name.findName() + ' ' + fakerStatic.name.findName()
    this.employee_name = fakerStatic.name.jobArea();
    this.department_name = fakerStatic.name.jobArea();
    this.unit_name = fakerStatic.name.jobArea();
    this.level = fakerStatic.random.number(15);
    this.location_name = fakerStatic.address.city();
  
    this.qualifications = [1, 2, 3, 4, 5, 6].map(id => new MyEmployeeQualification({}).fake(id));
    this.certification = [1, 2, 3, 4, 5, 6].map(id => new EmployeeCertification({}).fake(id));
    this.abilities = [1, 2, 3, 4, 5, 6].map(id => new EmployeeAbilities({}).fake(id));
    this.skills = [1, 2, 3, 4, 5, 6].map(id => new EmployeeSkill({}).fake(id));

    return this;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor() { }
}
