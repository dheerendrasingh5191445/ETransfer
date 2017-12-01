import { Component, OnInit } from '@angular/core';
import { CsoService } from "../cso.service";
import { Request } from '../../model/request';
import { Employee } from '../../model/Employee';
import {AssetsData}  from '../../model/asset';
import {DatePipe , TitleCasePipe} from '@angular/common';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import { routerTransition } from './../../router.animations';
import {Router} from '@angular/router';


@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css'],
  animations: [routerTransition()]
})
export class ApprovalListComponent implements OnInit {
  myReqList:Request[];
  myAssetDetail : AssetsData[];
  empCode:Request;
  value:number;
  public loading = false;
  errorMsg:any;
 
  constructor( private csoService : CsoService,private router:Router) {   } //CsoService will be used to connect with the API
  ngOnInit() {
    //getting data from API to Angular Application when the page is executed for the first time
    //calling servive from here
  let id=sessionStorage.getItem("empid");
    this.csoService.getViewAllRequest(id)
    
                     .subscribe(response => {this.myReqList=response;this.loading = false;} ,error=>{this.errorMsg=error;this.router.navigate(['error',this.errorMsg])});       
  }
  
  getAssetDetails(empCode)
  {
    //getting data from service when button of get asset list is pressed
   
    this.csoService.getAssetDetailsByCode(empCode)
                   .subscribe(response => {this.myAssetDetail = response;},error=>{this.errorMsg=error;this.router.navigate(['error',+this.errorMsg])});
  }
 
  
  approveUserRequest(myList:Request)
  {
    //This method is called when CSO accepts Approve the Request
    //This will call service
    myList.requestStatus = "Completed"; //change the request status by cso to Completed
    myList.pendingWith = "Approved"; //change the pending with to approved

    this.csoService.updateApprovalStatus(myList); //calling the update method of cso service
    //Removing the row immediately when CSO accept the request
    const index=this.myReqList.indexOf(myList);
    this.myReqList.splice(index,1); //remove the request from dom as and when approved button is clicked
    alert("Request Is Approved");
  }
}