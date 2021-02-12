import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetType: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  resetOption() {
  this.resetType = !this.resetType;
  }
}
