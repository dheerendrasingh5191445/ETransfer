import { Component, OnInit,Input } from '@angular/core';
import { SupervisorService } from './../supervisor.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Request} from '../../model/request';
import {AssetsData} from '../../model/asset';
import {AssetsDetail} from '../../model/assetDetail';
import { Employee} from '../../model/Employee';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-assetassign',
  templateUrl: './assetassign.component.html',
  styleUrls: ['./assetassign.component.css'],
})
export class AssetassignComponent implements OnInit {
  @Input() request:Request;
  
  myassetList:AssetsData[];
  employees:Employee[];
  itemsCopy:AssetsData[];
  searchTerm:string;
  searchList:string[]=[];
  searchItems:string[];
  noOfitem:string = "10";
  MyList:string[]=["10","25","50","100"];
  
  
    constructor(private assetService:SupervisorService,private router:Router) { }
   //this method is getting all the asset related to that user and bring the all the employee who r subordinate of supervisor

    ngOnInit() {
      this.assetService.getAsset(this.request.employeeCode)
                       .subscribe(asset=>{  this.myassetList = asset;this.itemsCopy =this.myassetList});
  
      this.assetService.getEmployeeListBySupervisorID(this.request.supervisorCode)
                       .subscribe(data => {this.employees = data.json().value; });  
    }
   //this method is used to search the subordinate to assign the asset to other user
    search(value): void {
      let term = value.toUpperCase();
      this.searchList = [];
      this.employees.filter(tag => tag.employeeCode.indexOf(term) >= 0 || tag.employeeName.indexOf(term) >= 0)
                    .forEach(value => this.searchList.push(value.employeeCode+":"+value.employeeName));
      this.searchItems = this.searchList;
  }
  //this method is used to filter the entries in main list or table
    searchAsset(){
      let term = this.searchTerm.toUpperCase();
      this.myassetList = this.itemsCopy.filter(tag => tag.assetCode.indexOf(term) >=0 || 
                                                    tag.description.indexOf(term) >= 0);
                     
   }
  //this method is used to generate request it will fill request table then asset table if exist
    GenrateRequest(){
      let count=0;
      this.myassetList.forEach(data =>{ if(data.reassignedTo == undefined){count++;}});
      if(count == 0){
      this.assetService.generatenewrequest(this.request)
                       .then(data =>{
                                        if(this.myassetList.length != 0)
                                        { 
                                          this.assetService.insertmyassetlist(this.myassetList)
                                                           .then(data =>{ this.router.navigate(['supervisor','dashboard'])});
                                        }
                                        else{this.router.navigate(['supervisor','dashboard']);}
                                          });
                    }
      else{
        window.alert("please assign all the asset to your subordinate!!!");
      }
    }
  
}
