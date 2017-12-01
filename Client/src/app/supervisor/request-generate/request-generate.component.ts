import { Component, OnInit,Input } from '@angular/core';
import{ Employee } from '../../model/Employee';
import { SupervisorService } from './../supervisor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Request } from '../../model/request';


import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'app-request-generate',
  templateUrl: './request-generate.component.html',
  styleUrls: ['./request-generate.component.css'],

})
export class RequestGenerateComponent implements OnInit {
 myemployee:Employee;
 mynewrequest:Request;
 dateOftransfer:Date;
 newpa:string="";
 newpsa:string="";
 newou:string="";
 newcc:string="";
 data:Request;
 category:string;
 mypendingrequest:string;
 MyList:string[]=["PA","PSA","OU","CC","RELEASE"];

  constructor(private supervisorService:SupervisorService,private route:ActivatedRoute) { }

  ngOnInit() {
    //this is to get the params from router url and call the service method to get value of list of employee 
    this.route.paramMap
              .switchMap((params:ParamMap)=>this.supervisorService.getmyemployeehere(params.get('id')))
              .subscribe(data =>{ this.myemployee = data.json().value;});      
}
//login to set code whenever select option is hit
defaultvalue(){ 
if(this.category == "PSA"){
  this.newpa= this.myemployee.paCode;
  this.newpsa= "";
  this.newou="";
  this.newcc=""
}
if(this.category == "OU"){
  this.newpa= this.myemployee.paCode;
  this.newpsa= this.myemployee.psaCode;
  this.newou="";
  this.newcc=""
}
else if(this.category == "CC"){
 this.newpa= this.myemployee.paCode;
 this.newpsa= this.myemployee.psaCode;
 this.newou= this.myemployee.ouCode;
 this.newcc=""
}
else if(this.category == "PA"){
  this.newpa="";
  this.newpsa= "";
  this.newou="";
  this.newcc=""
}
else{
  this.newpa= this.myemployee.paCode;
  this.newpsa= this.myemployee.psaCode;
  this.newou= this.myemployee.ouCode;
  this.newcc=this.myemployee.ccCode;
}
}

assignasset(){
// this function is called for assigning the asset related to particular employee
     if(this.newpa == this.myemployee.paCode &&  this.newpsa == this.myemployee.psaCode && this.newou == this.myemployee.ouCode
     &&  this.newcc ==this.myemployee.ccCode){
        window.alert("oopss already in this deparment, try with other code !!!!!");
    }
    else if(this.dateOftransfer == undefined ){
        window.alert("please fill date of transfer and proceed!!!!!");
    }
     else{
            this.data =new Request(this.myemployee.employeeCode,this.myemployee.supervisorCode,
                                    this.category,this.newpa,this.newpsa,this.newou,this.newcc,this.dateOftransfer,
                                    "pending","CSO");
    }
}
}
