import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {customConfig} from "../custumConfig";
@Injectable({
  providedIn: 'root'
})
export class CustomServiceService {
  Urlbase: string = customConfig.baseUrl;
  constructor( public http: HttpClient,) { }

  downloadSampleTemplate(processId: number | undefined){

    let endPoint: string = this.Urlbase + '/api/BulkMaster/DownloadSampleTemplate?processId=' + processId;
    let options_ : any = {
      observe: "response",
      responseType: "arrayBuffer",
      headers: new HttpHeaders({
          "Accept": "text/plain"
      })
  };
 
    var _result = this.http.get( endPoint,options_);
    return _result;
 
  
  }
}
