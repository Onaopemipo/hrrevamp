import { range, Subject } from "rxjs";
import * as fakerStatic from 'faker';

export class MessageOut {
    isSuccessful: boolean;
    message: string;
    redirectUrl: string;
    retId: 0;

    constructor(message, isSuccesful) {
      this.message = message;
      this.isSuccessful = isSuccesful;
    }
}

export function createSubscription<T>(data: T) {
    const subject = new Subject<T>();
    window.setTimeout(() => {
        subject.next(data);
        subject.complete();
    }, 1000);
    return subject.asObservable();
}

export function randomChoice<T>(values: T[]) {
    const random = Math.floor(Math.random() * values.length);
    return values[random];
}

export function randomEnumValue(_enum: any) {
    const arr = Object.values(_enum);
    return randomChoice(arr);
}

const classes = {};

function get_word(args: FakeConfig) {
  return fakerStatic.random.words();
}

function get_name(args: FakeConfig) {
  return fakerStatic.name.findName();
}

function get_number(args: FakeConfig) {
  return fakerStatic.random.number();
}

function get_object(args: FakeConfig) {
  return new args.class().getFake();
}

export interface Ctor {
  new (...args: []): any;
}

export const FAKER_CONFIG = {
  words: get_word,
  name: get_name,
  number: get_number,
  object: get_object,
};
export interface IFaker {
  getFake();
}
export function myClassFaker<T extends Ctor>(OldClass: T): T{
  // console.log(OldClass);
  OldClass.prototype.getFake = () => {
    const classInfo = classes[OldClass.name];
    const res = {};
    classInfo.forEach(property => {
      const fake_function = property.type;
      if (property.args.array) {
        const arr = [];
        for (let a = 1; a < fakerStatic.random.number(100); a++){
          arr.push(a);
        }
        res[property.name] = arr.map(a => fake_function(property.args));
      } else {
        res[property.name] = fake_function(property.args);
      }
    });
    return res;
  };
  return OldClass;
  // console.log(constructor.arguments);
  // console.log(constructor.prototype);
  // return class NewClass extends OldClass{
  //   getFake() {
  //     return classes[OldClass.name];
  //   }
  // }
}

export interface FakeConfig{
  array?: boolean;
  class?: any;
}

export interface IFakeProperty {
  name: string;
  type: any;
  args: FakeConfig;
}

export function myPropertyFaker(type, args: FakeConfig) {
  function testProperty(target, name) {
    const className = target.constructor.name;
    if (classes[className]) {
      classes[className].push({name, type, args});
    } else {
      classes[className] = [{name, type, args}];
    }
    // console.log(classes);
  }
  return testProperty;
}
