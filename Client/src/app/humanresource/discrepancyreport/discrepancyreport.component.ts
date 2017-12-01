import { Component, OnInit,EventEmitter , Output } from '@angular/core';
import { HrViewRequestService } from '../hr.service';
import { DiscrepancyReport } from './../../model/discrepancyReport';
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { routerTransition } from './../../router.animations';


@Component({
  selector: 'app-discrepancyreport',
  templateUrl: './discrepancyreport.component.html',
  styleUrls: ['./discrepancyreport.component.css'],
  animations: [routerTransition()]
})
export class DiscrepancyreportComponent implements OnInit {

  //variable used in discrepancyreport component
  report:DiscrepancyReport[]=[];
  itemsCopy:DiscrepancyReport[]=[];
  errorMsg : any;
  searchTerm:string;
  EmpDetails: DiscrepancyReport[] =[];
  requestPsa : string;
  requestCc : string;
  requestOu : string;
  requestPa : string;
  sapPa : string;
  sapPsa : string;
  sapCc : string;
  sapOu : string;
  term:any;

  constructor(private hrViewRequestService : HrViewRequestService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
   
    //This method will get all the pending request via calling HrViewRequstService corresponding to that HR's employee code only
    this.hrViewRequestService.getDiscrepancyReport()
    .subscribe(data =>{ 
      this.report =data; 
      this.itemsCopy = this.report; 
     }) ,error=>{ this.errorMsg =error;this.router.navigate(['/error-handle/'+this.errorMsg])};
    //Error page will occured if something went wrong in the system

}
  
getRequestDetailfromHTMLindiscrepancy(detail) //This method will get the data will button of modal will be clicked 
{
  this.EmpDetails=this.report.filter((empData1)=>{
   return empData1.employeeCode.trim===detail.employeeCode.trim; //filtering the data to local variable 
  });

   this.requestPa=this.EmpDetails[0].requestPa;  //assigning data to local variable which will be rendered to HTML
   this.requestPsa=this.EmpDetails[0].requestPsa;
   this.requestCc=this.EmpDetails[0].requestCc;
   this.requestOu=this.EmpDetails[0].requestOu;
   this.sapPa=this.EmpDetails[0].sapPa;
   this.sapPsa=this.EmpDetails[0].sapPsa;
   this.sapCc=this.EmpDetails[0].sapCc;
   this.sapOu=this.EmpDetails[0].sapOu;
}

search(): void {
  //This method is used to search via employeeCode and employeeName
  this.term = this.searchTerm.toUpperCase(); // This is used to convert the string in UpperCase
  this.report = this.itemsCopy.filter(tag => tag.employeeCode.indexOf(this.term) >=0 ||    //Used tp search by employee code 
                                                tag.employeeName.indexOf(this.term) >= 0); //Used to search by employee name
}

}
