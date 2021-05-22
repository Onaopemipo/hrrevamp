import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-benefitdetais',
  templateUrl: './benefitdetais.component.html',
  styleUrls: ['./benefitdetais.component.scss']
})
export class BenefitdetaisComponent implements OnInit {

  constructor(private router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((paramMap)=> {
      if(!paramMap.has('id')){
        this.router.navigateByUrl('/benefits')
      }
      const BenefitId = paramMap.get('id');
      alert(BenefitId)
    })
    
  }

}
