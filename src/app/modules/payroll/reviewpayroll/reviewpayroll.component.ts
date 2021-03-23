import { Component, OnInit } from '@angular/core';
enum TOP_ACTIONS {
  ADDPAYELEMENT,
  ADD_PLAN
}
interface Fields {
  id?: number,
  name?: string
}

@Component({
  selector: 'ngx-reviewpayroll',
  templateUrl: './reviewpayroll.component.html',
  styleUrls: ['./reviewpayroll.component.scss']
})
export class ReviewpayrollComponent implements OnInit {
  payElement: Fields[] = []
  ElementList = []

  //this below will contain the selected field
  showAddModal: boolean = false
  showEditModal: boolean = false
  selectedOption = ''
  topActionButtons = [
    { name: TOP_ACTIONS.ADDPAYELEMENT, label: 'Add Pay Element', 'icon': 'plus', outline: true },

  ];
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

  modal(event) {
    if (event == TOP_ACTIONS.ADDPAYELEMENT) {
      this.showAddModal = true
    }
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

  showModal() {
    this.showEditModal = true
  }

}

