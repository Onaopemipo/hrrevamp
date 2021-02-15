import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-leave-plan',
  templateUrl: './leave-plan.component.html',
  styleUrls: ['./leave-plan.component.scss']
})
export class LeavePlanComponent implements OnInit {

  get hel(){
    return 'me';
  }
  set hello(val: string){
    alert(val);
  }
  topActionButtons = [
    {name: 'nnn', label: 'AAAAAAA', 'icon': 'plus', outline: false},
  ]
  tableColumns = [
    {name: 'a', title: 'AAA'},
    {name: 'b', title: 'BBB'},
  ]
  get showFirstName(){
    return this.selectedOption === '1';
  }
  constructor() { }

  ngOnInit(): void {
  }
  selectedOption = '1'
  b = 'mmm';
  value = 'aaaa'
  onClick(){
    this.hello = this.value;
    this.b = this.hello;
  }
  firstName = 'a'
  //lastName = 'b'
  get fullName(){
    return this.firstName + ' ' + this.lastName
  }

  set lastName(val: string){
    if(val.length === 5){
      if(val === 'bbbbb')
      alert('You can continue')
      else
      alert('Password validation failed')
    }
  }
}
