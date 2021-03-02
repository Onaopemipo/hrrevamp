import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
  title: string = 'Shifts';
  rbutton = [
    { name: 'new_shift', label: 'New Shift', icon: 'plus', outline: false }, 
    
  ];
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'Full Name' },
    { name: 'c', title: 'Supervisor' },
    { name: 'd', title: 'Status' },
    { name: 'e', title: '' },
    { name: 'f', title: '' },
  ];

  constructor(private router: Router) { }
  modal(button) {
    if (button == "new_shift") {
    this.router.navigate(['timeandattendance/timeandattendance/createshifts'])
    }

  }
  ngOnInit(): void {
  }
}
