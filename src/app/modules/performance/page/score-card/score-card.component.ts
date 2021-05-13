import { GetPerformanceScoreCardsServiceProxy } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ScoreCardQuestion } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss', '../performance-review/performance-review.component.scss']
})
export class ScoreCardComponent implements OnInit {

  constructor(
    private api: GetPerformanceScoreCardsServiceProxy,
  ) { }

  ngOnInit(): void {
    this.api.fetchPerformanceScoreCards(0, 0, 0, 10, 1).subscribe(data => {})
  }

}
