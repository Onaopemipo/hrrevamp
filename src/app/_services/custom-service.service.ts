import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {customConfig} from "../custumConfig";
@Injectable({
  providedIn: 'root'
})
export class CustomServiceService {
  Urlbase: string = customConfig.baseUrl;
  nextTenYears = [];
  prevTenYears = [];
  constructor( public http: HttpClient,) { }

  downloadSampleTemplate(processId: number | undefined){

    let endPoint: string = this.Urlbase + '/api/BulkMaster/DownloadSampleTemplate?processId=' + processId;
    let options_ : any = {
      responseType: "arrayBuffer", 
  };
 
    var _result = this.http.get( endPoint,options_);
    return _result;
  
  }
  downloadFile(data: any,datatype) {
    const blob = new Blob([data], { type: datatype });
    const url= window.URL.createObjectURL(blob);
    window.open(url);

  }

  getnxttenyears(){
    this.nextTenYears = [];
    var thisyear = new Date().getFullYear();
    var nxttenyrs = [];
    nxttenyrs.push(thisyear);
    for(var i=0; i<=10;i++){
      thisyear +=1;
      nxttenyrs.push(thisyear);
    }
this.nextTenYears= nxttenyrs;
//console.log(this.nextTenYears);
  }

  getprevtenyears(){
    this.prevTenYears = [];
    var thisyear = new Date().getFullYear();
    var prevtenyrs = [];
    prevtenyrs.push(thisyear);
    for(var i=0; i<=10;i++){
      thisyear -=1;
      prevtenyrs.push(thisyear);
    }
this.prevTenYears= prevtenyrs;
//console.log(this.nextTenYears);
  }

}
