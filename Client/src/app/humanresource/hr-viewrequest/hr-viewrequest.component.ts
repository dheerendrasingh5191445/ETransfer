import { Component, OnInit } from '@angular/core';
import { HrViewRequestService } from '../hr.service'; 
import { Employee } from '../../model/employee';
import { Request } from '../../model/request';
import { HrViewRequest } from '../../model/hr-ViewRequest';
import { DiscrepancyReport } from '../../model/discrepancyreport';
import {DatePipe} from '@angular/common';
import { routerTransition } from './../../router.animations';
import { Router } from "@angular/router";


@Component({
  selector: 'app-hr-viewrequest',
  templateUrl: './hr-viewrequest.component.html',
  styleUrls: ['./hr-viewrequest.component.css'],
  animations: [routerTransition()]
})
export class HrViewrequestComponent implements OnInit {

   //variable used in Hr view request component
  requestList:HrViewRequest[]=[];
  itemsCopy:HrViewRequest[]=[];
  request:Request;
  comment:string;
  searchTerm:string;
  errorMsg : any;
  id:number;
  requestOne:HrViewRequest ;
  details:HrViewRequest;
  getEmpData : string;
  empData:HrViewRequest;
  EmpDetails:any;
  newPaCode:string;
  newpsacode : string;
  newOucode : string;
  newcCode : string;
  oldpacode : string;
  oldpsacode : string;
  oldcCode : string;
  oldOucode : string;
  term : any;

  constructor(private hrViewRequestService : HrViewRequestService, private router:Router) { }

  ngOnInit() {
       //This method will get all the pending request via calling HrViewRequstService
       let id=sessionStorage.getItem("empid");
      this.hrViewRequestService.getmypendingrequestlist(id)
       .subscribe(data => {this.requestList = data;; this.itemsCopy = this.requestList;}) ,error=>{ this.errorMsg =error;this.router.navigate(['/error-handle/'+this.errorMsg])};
       //Error page will occured if something went wrong in the system

  }

  getRequestDetailfromHTML(detail) //This method will get the data will button of modal will be clicked 
  {

    this.EmpDetails=this.requestList.filter((empData1)=>{  //filtering the data to local variable
     return empData1.requestId.trim===detail.requestId.trim;
    });
    this.newPaCode=this.EmpDetails[0].newpacode; //assigning data to local variable which will be rendered to HTML
    this.newpsacode=this.EmpDetails[0].newpsacode;
    this.newOucode=this.EmpDetails[0].newOucode;
    this.newcCode=this.EmpDetails[0].newcCode;
    this.oldpacode=this.EmpDetails[0].oldpacode;
    this.oldpsacode=this.EmpDetails[0].oldpsacode;
    this.oldcCode=this.EmpDetails[0].oldcCode;
    this.oldOucode=this.EmpDetails[0].oldOucode;
}

search(): void {
    //This method is used to search via employeeCode and employeeName
  this.term = this.searchTerm.toUpperCase(); // This is used to convert the string in UpperCase
  this.requestList = this.itemsCopy.filter(tag => tag.employeeCode.indexOf(this.term) >=0 || //Used tp search by employee code 
                                                tag.employeeName.indexOf(this.term) >= 0);   //Used to search by employee name
}
}
