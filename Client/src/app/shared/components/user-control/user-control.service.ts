import { Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../model/Employee';
import { Request } from '../../../model/Request';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserControlService{
   constructor(private http:Http){}
   getEmployeeDetail(id:string):Promise<Employee>{
       return this.http.get("http://localhost:56622/api/User/GetEmployee/"+id)
       .toPromise().then(response => response.json());
   }
   getRequestInfoForEmployee(id:string):Promise<Request>{
       return this.http.get("http://localhost:56622/api/User/GetRequest/"+id)
       .toPromise().then(response => response.json());
   }
}