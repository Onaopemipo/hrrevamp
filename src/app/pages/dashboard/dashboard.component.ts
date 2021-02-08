import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pagetitle = 'Dashboard';
  rbutton = [
    { name: 'create_new', label: 'Create New', icon: '', outline: true },
    { name: 'add_new', label: 'Add New', icon: 'plus', outline: false },


  ];
  show_modal = false;
  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.show_modal = true;
  }

  closeModal() {
    this.show_modal = false;
  }

}
