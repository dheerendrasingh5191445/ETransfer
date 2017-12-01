import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../../router.animations';
import { UserControlService } from './user-control.service';
import { Employee } from '../../../model/employee';
import { Request } from '../../../model/request';
import { DatePipe } from '@angular/common';


@Component({
 selector: 'app-user-control',
 templateUrl: './user-control.component.html',
 styleUrls: ['./user-control.component.css'],
 animations: [routerTransition()] 
})
export class UserControlComponent implements OnInit {
 employee:Employee;
 emp_id:number;
 request:Request;
 requestStatus:string="0%";
 token;
 constructor(private userControlService: UserControlService) { }


 ngOnInit() {

   const session =sessionStorage.getItem("empid");
   this.userControlService.getEmployeeDetail("80044456")
                          .then(data => {this.employee = data; this.userControlService.getRequestInfoForEmployee("80044456")
                          .then(data=>{this.request = data,this.progressbarLogic();
   });
 });
 }
//this function is for calculating the progress of request generated for employee
progressbarLogic()
{

 if(this.request.pendingWith=="Supervisor")
 {
    this.token = 0;
    this.request.pendingWith="Pending with "+this.request.pendingWith;
 }  

 else if(this.request.pendingWith=="CSO")
 {
     this.token = 1;
     this.request.pendingWith="Pending with "+this.request.pendingWith;
 }

 else if(this.request.pendingWith=="Approved")
 {
     this.token = 2;
 }  
   
 }
   
}