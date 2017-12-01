import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../router.animations';

import { CsoService } from "../cso.service";
import { Request } from '../../model/request';
import { Employee } from '../../model/Employee';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accept-history',
  templateUrl: './accept-history.component.html',
  styleUrls: ['./accept-history.component.css'],
  animations: [routerTransition()]
})
export class AcceptHistoryComponent implements OnInit {
  myReqList:Request[];
  errorMsg:any;
  value:number;
  constructor( private csoService : CsoService,private router:Router ) {   } //CsoService will be used to connect with the API
  ngOnInit() {
  //getting data from API to Angular Application when the page is executed for the first time
    //calling servive from here

    this.csoService.getViewApprovedRequest()
    .subscribe(response => {this.myReqList = response;},
                            error=>{this.errorMsg=error;this.router.navigate(['error',this.errorMsg])}); 
            
                   
  }
}