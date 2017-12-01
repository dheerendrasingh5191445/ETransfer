import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';


@Injectable()
export class MyLoginService {
supervisorIsvalid:boolean = false;
hrIsvalid:boolean = false;
csoIsvalid:boolean = false;
assetcontrollerIsvalid:boolean = false;
user:boolean = false;

private headers = new Headers({'Content-Type': 'application/json'});
constructor(private http: Http) { }


//for validation whenever route guard will hit the request to this sevice
isValidsupervisor():boolean{
   const session = sessionStorage.getItem("role");
   if(session == "supervisor") return true;
   else return false;

} 
isValidasset():boolean{
  const session = sessionStorage.getItem("role");
  if(session == "asset-control") return true;
  else return false;
} 
isValidhr():boolean{
  const session = sessionStorage.getItem("role");
  if(session == "humanresource") return true;
  else return false;
} 
isValidcso():boolean{
  const session = sessionStorage.getItem("role");
  if(session == "cso-control") return true;
  else return false;

} 
isValiduser():boolean{
  const session = sessionStorage.getItem("role");
  if(session == "user") return true;
  else return false;

} 



}
