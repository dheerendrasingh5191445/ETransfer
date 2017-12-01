import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { MyLoginService} from './../shared/guard/mylogin.service';
import { Data } from './../model/data';
import { EmpInfo } from './../model/empInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 res:Data;
 usertoken:string;
 emp:EmpInfo = new EmpInfo("","","","","");
 showLoader:boolean = true;
  constructor(private setValid:MyLoginService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //this method will receive the the token from the api
    this.route.params.subscribe(params=>this.decodeToken(params));   
  }
  
  //this method is used for decoding the token
  decodeToken(token:any){
   
    var tokendata=JSON.parse(token["value"]).token;
  
    var base64Url = tokendata.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var payload=JSON.parse(window.atob(base64));
    this.emp.empCode=payload["sid"];
    this.emp.empName=payload["sub"];
    this.emp.Email=payload["email"];
    this.emp.role=payload["typ"];
    this.emp.valid=payload["prn"];
    
    sessionStorage.setItem("role",this.emp.role);
    sessionStorage.setItem("empid",this.emp.empCode);
    sessionStorage.setItem("token",tokendata);
    this.router.navigate(['dashboard',this.emp.role]);//navigate to respective roles dashboard 
  }
}
