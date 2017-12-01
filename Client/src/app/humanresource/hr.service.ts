import { Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs/Observable';
import { Request } from '../model/request';
import { ConfigFile} from '../shared/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HrViewRequestService{
    constructor(private http:Http){}

    getmypendingrequestlist(empCode : string){
        //This method is used to get the pending request from API
        return this.http.get(ConfigFile.HrServiceUrls.HrAllGet+empCode)
                        .map(response => response.json()).catch(this.handleError);
        
    }

    getDiscrepancyReport(){
                //This method is used to get the discrepancy report
                return this.http.get(ConfigFile.HrServiceUrls.HrDiscrepancyReport)
                .map(response=>response.json()).catch(this.handleError); // catch the exception from API
            }

    private handleError  (error : any) 
    {
        //This method is used to display the exception to user
        if(error.status==404)
        {
            return Observable.throw( 404 || error ); //Will show page not found exception
        }

        else if(error.status==400)
        {
               return Observable.throw(400 || error ); //Used to show Bad request exception
        }

        return Observable.throw(500 || error  ); // Used to show Internal server error
    }
}