import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { MyLoginService }  from './mylogin.service';

@Injectable()
export class UserGuard implements CanActivate {
 result:boolean;
  constructor(private authService: MyLoginService,private router:Router) {}

  canActivate(): boolean {
    this.result = this.authService.isValiduser();
    if(this.result == true) return true;
    else this.router.navigate(['error',420]);
  }
}