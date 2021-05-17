import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AddUpdateRatingServiceProxy,IDTextViewModel, DeleteRatingRecordServiceProxy,DataServiceProxy, FetchRatingsServiceProxy, RatingDTO } from 'app/_services/service-proxies';
import { NbPopoverDirective } from '@nebular/theme';


@Component({
  selector: 'ngx-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss', '../performance-review/performance-review.component.scss']
})
export class RatingComponent implements OnInit {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  newRatingForm: FormGroup;
  newRatingBody = new RatingDTO().clone();
  showAddRatingModal: boolean = false;
  loadingRatingAdd: boolean = false;
  allRating: RatingDTO[] = [];
  allRatingTypes: IDTextViewModel[] = [];
  constructor(private FetchRatingsService: FetchRatingsServiceProxy,
    private alertService: AlertserviceService,private AddUpdateRatingService: AddUpdateRatingServiceProxy,
    private CommonService:DataServiceProxy,private DeleteRatingRecordService : DeleteRatingRecordServiceProxy) { }
    get showEmpty() {
      return this.allRating.length === 0;
    }
  createUpdateRating() {
    this.allRating = [];
    this.loadingRatingAdd = true;
    var ListBody: RatingDTO[] = [];
    ListBody.push(this.newRatingBody);
    let newRating = JSON.stringify(ListBody);
    this.AddUpdateRatingService.addUpdateRating(newRating).subscribe(data => {
      this.loadingRatingAdd = false;
      if (!data.hasError) {
        this.newRatingBody = new RatingDTO().clone();
        this.showAddRatingModal = false;
        this.getAllRating()
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    });
  }
  editActionClicked(rating) {
    this.popover.hide();
    this.newRatingBody = rating;
    this.showAddRatingModal = true;
  }
  deleteActionClicked(id) {
    this.popover.hide();
    this.allRating = [];
    this.loadingRatingAdd = true;
    this.DeleteRatingRecordService.deleteRating(id).subscribe(data => {
      this.loadingRatingAdd = false;
      if (!data.hasError) {
        this.getAllRating()
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.SUCCESS, data.message, "ok");
      } else {
        this.alertService.openModalAlert(this.alertService.ALERT_TYPES.FAILED, data.message, "ok");
      }
    });
  }
  getAllRating() {
    this.loadingRatingAdd = true;
    this.FetchRatingsService.getRatings().subscribe(data => {
      this.loadingRatingAdd = false;
      if (!data.hasError) {
        this.allRating = data.result;
       
      } else {
       
      }
    });
  }
  getRatingType() {
    this.loadingRatingAdd = true;
    this.CommonService.getRatingTypes().subscribe(data => {
      this.loadingRatingAdd = false;
      if (!data.hasError) {
        this.allRatingTypes = data.result;
       
      } else {
       
      }
    });
  }
  ngOnInit(): void {
    this.getAllRating();
    this.getRatingType();
  }

}
