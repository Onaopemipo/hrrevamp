import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  title: string = 'Projects';
  rbutton = [
    { name: 'new_project', label: 'New Project', icon: 'plus', outline: false },

  ];
  tableColumns = [
    { name: 'a', title: 'S/N' },
    { name: 'b', title: 'Full Name' },
    { name: 'c', title: 'Supervisor' },
    { name: 'd', title: 'Status' },
    { name: 'e', title: '' },
    { name: 'f', title: '' },
  ];
  showcreatenewProjectModal = false;
  constructor() { }
  modal(button) {
    if (button == 'new_project') {
      this.showcreatenewProjectModal = true;
    }

  }
  ngOnInit(): void {
  }

}
