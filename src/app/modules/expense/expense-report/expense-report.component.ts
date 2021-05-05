import { ExpenseRequestService } from 'app/modules/expense/services/expense-request.service';
import { Component, OnInit } from '@angular/core';
import { ColumnTypes, TableColumn } from 'app/components/tablecomponent/models';
import { MainBaseComponent } from 'app/components/main-base/main-base.component';
import { BaseComponent } from 'app/components/base/base.component';
import { MyExpenseRequest } from '../services/expense-request.service';
import { ExpenseReportService, MyExpenseReport } from '../services/expense-report.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ConfirmBoxService } from 'app/_services/confirm-box.service';
import { of } from 'rxjs';
import * as fakerStatic from 'faker';


enum TOP_ACTIONS { }

const classes = {}
const FAKER_CONFIG = {
  words: fakerStatic.random.words,
  name: fakerStatic.name.firstName,
}
interface Ctor{
  new (...args: []): any;
}

interface IFaker {
  getFake();
}
function sealed<T extends Ctor>(OldClass: T): T{
  // console.log(OldClass);
  OldClass.prototype.getFake = () => {
    const classInfo = classes[OldClass.name];
    const res = {};
    classInfo.forEach(property => {
      res[property.name] = FAKER_CONFIG[property.type]();
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


function sss(type, args: any[]){
  function testProperty(target, name){
    const className = target.constructor.name;
    if(classes[className]){
      classes[className].push({name, type, args});
    } else {
      classes[className] = [{name, type, args}];
    }
    // console.log(classes);
  }
  return testProperty;
}

@sealed
class BugReport implements IFaker{
  @sss('name', [])
  type = "report";

  @sss('name', [])
  title: string;
  getFake(){}

  // constructor(t: string) {
  //   this.title = t;
  // }
}

// const NewBugReport = sealed(class {
//   @sss('name', [])
//   type = "report";

//   @sss('name', [])
//   title: string;

//   // constructor(t: string) {
//   //   this.title = t;
//   // }
// });
// type NewBugReport = InstanceType<typeof NewBugReport>;
@Component({
  selector: 'ngx-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent extends BaseComponent<MyExpenseRequest, {}, MyExpenseRequest> {
  successMessage = "true";
  filter = {};
  data = [];
  topActionButtons = [
  ];
  TOP_ACTIONS = TOP_ACTIONS;
  tableColumns = [
    { name: 'refNo', title: 'REF ID' },
    { name: 'loggedForEmployeeName', title: 'Employee Name' },
    // { name: 'date', title: 'Project' },
    { name: 'expenseTypeName', title: 'Type' },
    { name: 'approvedAmount', title: 'Approved Amount' },
    { name: 'date', title: 'Approval Status', type: ColumnTypes.Status },
    { name: 'disburse_status', title: 'Disbursement Status', type: ColumnTypes.CustomStatus }
  ];

  saveData(){
    return of();
  }

  deleteData(){
    return of();
  }

  getData() {
    return this.api.list({});
  }

  getNewEditingData(){
    return new MyExpenseRequest();
  }

  public constructor(
    protected alertService: AlertserviceService,
    protected confirmBox: ConfirmBoxService,
    protected api: ExpenseRequestService,
  ){
    super(confirmBox);
  }

  ngOnInit(){
    super.ngOnInit();
    const a = new BugReport();
    const b: any = a;
    console.log(a.getFake());
    // const f = new NewBugReport();
    // f.getFake();
  }
}
