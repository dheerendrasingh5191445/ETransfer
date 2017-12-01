import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Headers, Http,RequestOptions } from '@angular/http';
import { Request} from '../model/request';
import { Employee } from '../model/Employee';
import {AssetsData} from '../model/asset';
import {AssetsDetail} from '../model/assetDetail';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class SupervisorService {
    token  = localStorage.getItem("token");
    headers =  new Headers({ 'Authorization': 'Bearer ' + this.token});
    options = new RequestOptions({ headers: this.headers });
    
    constructor(private http: Http,private router:Router) {

     }

    //this function is used for bringing the employee list from our json
    getEmployeeListBySupervisorID(empId:string){
        return this.http.get("http://localhost:56622/api/EmpDatabase/GetMyEmployee/"+empId)
                         //catch server failures and pass them to an error handler.
    }   
  
    //this function is used to bring the detail of request generated list to the table
    getAllgeneratesrequest(empId:string):Promise<any>{
        return  this.http.get("http://localhost:56622/api/Supervisor/GetRequestById/"+empId)
                         .toPromise();
                                   
    }
    //this function is used to fetch the detail of particular employee
    getmyemployeehere(id:string):Promise<any>{
        return this.http.get("http://localhost:56622/api/EmpDatabase/GetOneEmployee/"+id)
                        .toPromise();
                    
    }
    //this function is used to post the request detail of particular employee  followed by insert RELATED asset details
    generatenewrequest(myrequest:Request):Promise<any> {
        return  this.http.post("http://localhost:56622/api/Supervisor/PostRequest",myrequest,{headers: new Headers({ 'Content-Type': 'application/json' })})
                         .toPromise()
                         .catch(this.handleError);
        
    }
    //this function is used for inserting the the related asset detail
    insertmyassetlist(assetdetail:AssetsData[]):Promise<any>{
        return this.http.post("http://localhost:56622/api/Supervisor/PostAsset",assetdetail,{headers: new Headers({ 'Content-Type': 'application/json' })})
                        .toPromise();
                        
    }
    //this function is used to bring the assets related to the employee
    getAsset(empId:string)
    {       
        return this.http.get("http://localhost:56622/api/AssetDb/GetMyAsset/"+empId)
                        .map(response => response.json());
    }
    //this function is used for the reassignment of the asset to any other person
    reassignAssetReallocation(reassignment:AssetsData):Promise<any>{
        return this.http.put('http://localhost:56622/api/Supervisor/PutAsset',reassignment,{headers: new Headers({'Content-Type':'application/json'})})
                        .toPromise();
    }
    //this will get all the rejected asset detail of the particular employee
    getRejectAssetDetails(myemployeelist:string[]):Promise<any> {
            
        return this.http.post('http://localhost:56622/api/Supervisor/GetRejectedAssetList',myemployeelist,{headers: new Headers({ 'Content-Type': 'application/json' })})
                        .toPromise()
                        .catch(error => this.handleError(error));
                        
                        
    }
    //this function will get the rejected list by the employee
    getrejectemployeesbyhr(){
        return this.http.get("http://localhost:56622/api/Supervisor/GetRequest")
                        .map(result =>result.json());
    }
   
    //it will bring the data to update form in supervisor view
    getmyrejectrequestdetailupdate(id:string):Promise<Request>{
        return this.http.get("http://localhost:56622/api/Supervisor/GetRequestById/"+id)
                        .toPromise()
                        .then(data =>data.json());
                        
    }
    //it will post the updated data in the table
    updatemyrejectedlist(updatedlist:Request):Promise<any>{
        return this.http.put('http://localhost:56622/api/Supervisor/PutRequest/'+updatedlist.requestId,updatedlist,{headers: new Headers({'Content-Type':'application/json'})})
                        .toPromise()
                        .catch(this.handleError);
            
    }
    //For handling error whenever as they happen in promise
    public handleError(error:Response){
        if(error.status == 404)
        { this.router.navigate(['error',404]); }
        else if(error.status == 401)
        { this.router.navigate(['error',401]); }
        else
        {this.router.navigate(['error',500])}
    }

    public SubhandleError = (error: Response) => {
        
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