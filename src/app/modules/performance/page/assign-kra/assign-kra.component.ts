import { Component, OnInit } from '@angular/core';
import { KeyResultAreaService, MyKeyResultArea } from '../../services/key-result-area.service';

@Component({
  selector: 'ngx-assign-kra',
  templateUrl: './assign-kra.component.html',
  styleUrls: ['./assign-kra.component.scss']
})
export class AssignKraComponent implements OnInit {

  constructor(
    private kra: KeyResultAreaService
  ) { }

  ngOnInit(): void {
  }

  assignKra() {
    this.kra.assignObj(new MyKeyResultArea());
  }

}
