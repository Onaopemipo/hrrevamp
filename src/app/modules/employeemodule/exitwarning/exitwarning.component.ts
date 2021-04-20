import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-exitwarning',
  templateUrl: './exitwarning.component.html',
  styleUrls: ['./exitwarning.component.scss']
})
export class ExitwarningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
onClick() {
this.router.navigateByUrl('/employeemodule/exitrequest');
  }
  gohome() {
    this.router.navigateByUrl('/');
  }
}
