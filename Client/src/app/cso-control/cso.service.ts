import { Injectable } from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Request } from '../model/request';
import { Employee } from '../model/Employee';
import {AssetsData}  from '../model/asset';
// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"
//to fetch the api Url
import { ConfigFile } from '../shared/config'

@Injectable()
export class CsoService {
	req: Request;
    constructor(private http: Http) { }
    getViewAllRequest(empCode:string) {
      //this method is used to get data from API to get pending requests
        return this.http.get(ConfigFile.CsoServiceUrls.CsoAllGet+empCode)
                        .map(response => response.json()).catch(this.handleError);
            
    }
    getViewApprovedRequest() {
      //this method is used to get data from API to get approved requests
        return this.http.get(ConfigFile.CsoServiceUrls.CsoApprovedGet)
                        .map(response => response.json()).catch(this.handleError);
            
    }
    updateApprovalStatus(req) {
      //this method is used to execute the approval request from CSO
        let id = req.requestId;
        this.http.put(ConfigFile.CsoServiceUrls.CsoPut+id, req, { headers: new Headers({ 'Content-Type': 'application/json' })}).subscribe();
                 
                 
   }  

  getAssetDetailsByCode(empCode : string) : Observable<AssetsData[]>
    {
      //this method is used to get the asset list 
        return this.http.get(ConfigFile.CsoServiceUrls.CsoAssetDetails + empCode)
                        .map(response => response.json()).catch(this.handleError);
    }
    public handleError = (error: Response) => {
      
  // Do messaging and error handling here

     if(error.status==404)
      {
        return Observable.throw(404||error)
      }
    else   if(error.status==400)
      {
        return Observable.throw(400||error)
      }

     return Observable.throw(500||error)
  }
}
