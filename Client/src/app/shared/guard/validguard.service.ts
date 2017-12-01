import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

@Injectable()
export class ValidGuard implements CanActivate {
 token:string;
  constructor() {}

  canActivate(): boolean {
   this.token = sessionStorage.getItem("token");
   if(this.token == undefined || this.token == null || this.token == "" )
   {
      return false;
   }
   else{
       return true;
   }
  }
}
