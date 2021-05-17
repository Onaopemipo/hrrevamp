import { AlertserviceService } from './../../../../_services/alertservice.service';
import { RatingDTO, AddUpdateRatingServiceProxy, FetchRatingsServiceProxy, DeleteRatingRecordServiceProxy } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss', '../performance-review/performance-review.component.scss']
})
export class RatingComponent implements OnInit {
  showModal = false;
  editingData = new RatingDTO();
  loadingSave = false;
  loading = false;
  data: RatingDTO[] = [];


  constructor(
    private addRatingService: AddUpdateRatingServiceProxy,
    private fetchRatingService: FetchRatingsServiceProxy,
    private deleteRatingService: DeleteRatingRecordServiceProxy,
    private alertService: AlertserviceService,
  ) { }

  async loadData(){
    this.loading = false;
    this.data = (await this.fetchRatingService.getRatings().toPromise()).result;
  }
  ngOnInit(): void {
    this.loadData();
  }

  editRating(rating: RatingDTO){
    this.editingData = rating;
    this.showModal = true;
  }

  async deleteRating(rating: RatingDTO){
    this.loading = true;
    const res = await this.deleteRatingService.deleteRating(rating.id).toPromise();
    this.alertService.showResponseMessage(res);
    this.loading = false;
  }

  createNew() {
    this.editingData = new RatingDTO();
    this.showModal = true;
  }

  async submitForm(){
    this.loadingSave = true;
    const res = await  this.addRatingService.addUpdateRating(JSON.stringify([this.editingData])).toPromise();
    this.alertService.showResponseMessage(res);
    this.loadingSave = false;
    if(!res.hasError){
      this.loadData();
      this.hideModal();
    }
  }

  hideModal() {
    this.showModal = false;
  }

}
