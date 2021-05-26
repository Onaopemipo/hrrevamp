import { CommonServiceProxy, DataServiceProxy, GetPerformanceScoreCardsServiceProxy } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ScoreCardQuestion,PerformanceScoreCardDTO,Location,DropdownValue } from 'app/_services/service-proxies';
import { ExcelServiceService } from 'app/_services/excel-service.service';
import { PdfServiceService } from 'app/_services/pdf-service.service';

@Component({
  selector: 'ngx-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss', '../performance-review/performance-review.component.scss']
})
export class ScoreCardComponent implements OnInit {
  alllocations: Location[] = [];
  alldepartments: DropdownValue[] = [];
filter = {
  departmentId: 0,
  locationId :0,
  unitId: 0,
  pageSize: 1000,
  pageNumber:  1
  }
  showFilter: boolean = false;
  allScoreCard: PerformanceScoreCardDTO[] = [];
  scorecardLoading: boolean = false;
  constructor(private ExcelService: ExcelServiceService, private PdfService: PdfServiceService,
    private CommonService: CommonServiceProxy,
    private api: GetPerformanceScoreCardsServiceProxy,private myDropdown: DataServiceProxy,
  ) { }

  get showEmpty() {
    return this.allScoreCard.length === 0;
  }
  changeFilter() {
    this.showFilter = !this.showFilter;
  }
  downloadas(event) {
    if (event == "Excel") {
      this.ExcelService.exportAsExcelFile(this.allScoreCard,"Score Card")
    }
    if (event == "pdf") {
     // this.PdfService.downloadAsPDF()
    }
  }
  getScoreCard() {
    this.scorecardLoading = true;
    this.api.fetchPerformanceScoreCards(this.filter.departmentId, this.filter.locationId, this.filter.unitId, this.filter.pageSize, this.filter.pageNumber).subscribe(data => {
      this.scorecardLoading = false;
      this.showFilter = false;
      if (!data.hasError) {
        this.allScoreCard = data.result;
}
    })
  }
  getdepartments() {
    this.myDropdown.getDropDownValuesById(2).subscribe(data => {
      if(!data.hasError){
         this.alldepartments = data.result;
      }
      else {
        console.log('There was an error')
      }
    })
  }
  getalllocations() {
    this.CommonService.getLocations().subscribe(data => {
      if (!data.hasError) {
        this.alllocations = data.result;
      }else{}
      
    })
  }
  ngOnInit(): void {
    this.getScoreCard();
    this.getdepartments();
    this.getalllocations();
  }

}
