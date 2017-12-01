import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
 selector: 'app-error',
 templateUrl: './error.component.html',
 styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
error:any;
 constructor(private route:ActivatedRoute,private location: Location) { }// inject Location,Activatedroute into class constructor

 ngOnInit() {
   this.route.params.subscribe(params=>this.error = params.id);
 }

 navigate()
 {
  this.location.back();// <-- go back to previous location on cancel
 }
}