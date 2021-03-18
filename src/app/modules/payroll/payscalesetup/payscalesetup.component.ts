import { Component, OnInit } from '@angular/core';
interface Fields {
  id?: number,
  name?: string
}
@Component({
  selector: 'ngx-payscalesetup',
  templateUrl: './payscalesetup.component.html',
  styleUrls: ['./payscalesetup.component.scss']
})
export class PayscalesetupComponent implements OnInit {
  payElement: Fields[] = []
  ElementList = []

  tableColumns  = [
    { name: 'a', title: 'NAME' },
    { name: 'b', title: 'ID' },
    { name: 'c', title: 'DEPARTMENT' },
    { name: 'd', title: 'DESIGNATION' },
  ]
  topActionButtons = [
    
  ]
  constructor() { }

  ngOnInit(): void {
    this.payElement = [
      {
        id: 1,
        name: 'Element one'
      },
      {
        id: 2,
        name: 'Element two'
      }, {
        id: 3,
        name: 'Element three'
      },
    ]
  }

  
  selectionChanged(ev: any) {
    const val = ev.target.value;

    let firstresult = '';
    //i want to check if any selected input is present in the elementList array
    //receving the checked ones
    firstresult = this.ElementList.find(x => x.name == val);
    if (firstresult) {
      alert('selected input already exit')
    }


    //if there is no element found that is equal to the value passed in the existing arrays then
    if (!firstresult) {

      let selectedElement = {
        name: val
      }
      this.ElementList.push(selectedElement)
    }

  }
  onDelete(list) {
    this.ElementList = this.ElementList.filter(Eli => {
      Eli.id !== list.id
    })
  }
  
  modal(event){

  }
}
