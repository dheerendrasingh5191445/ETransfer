import { Component, OnInit } from '@angular/core';
import { SupervisorService } from './../supervisor.service';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Request} from '../../model/request';
import { AssetsData} from '../../model/asset';
import { AssetsDetail} from '../../model/assetDetail';
import { Employee} from '../../model/Employee';
import { Observable }        from 'rxjs/Observable';
import { routerTransition}from "./../../router.animations";
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-rejectedassetassign',
  templateUrl: './rejectedassetassign.component.html',
  styleUrls: ['./rejectedassetassign.component.css'],
  animations:[routerTransition()]
})
export class RejectedassetassignComponent implements OnInit {
  myassetList:AssetsData[];
  itemsCopy:AssetsData[];
  searchTerm:string;
  searchList:string[]=[];
  searchItems:string[];
  myrejectedassetlist:AssetsData[];
  myrelatedemployees:string[]=[];
  myemployee:Employee[]=[];
  noOfitem:string = "10";
  MyList:string[]=["10","25","50","100"];
  showLoader:boolean = true;


  constructor(private supersearch:SupervisorService) { }

  ngOnInit() {
  //this method is to bring all rejected asset according to particular employeecode
    const session = sessionStorage.getItem("empid")    
    this.supersearch.getEmployeeListBySupervisorID(session)
                    .subscribe(data =>{ this.myemployee = data.json().value;
                                        this.myemployee.filter((object) => {this.myrelatedemployees.push(object.employeeCode);
                                                       });
    this.getDetails(this.myrelatedemployees);})
  }


  getDetails(myemp:string[]){
    //this method is passing all the employee code to obtain the related detail of any asset
        this.supersearch.getRejectAssetDetails(myemp)
                        .then(result => {this.myrejectedassetlist = JSON.parse(result["_body"]);this.showLoader = true });
    }
 

  //this method is used to search the subordinate to assign the asset to other user
  search(value): void {
    let term = value.toUpperCase();
    this.searchList = [];
    this.myemployee.filter(tag => tag.employeeCode.indexOf(term) >= 0 || tag.employeeName.indexOf(term) >= 0)
                  .forEach(value => this.searchList.push(value.employeeCode+":"+value.employeeName));
    this.searchItems = this.searchList;
 }

  //this method is used to filter the entries in main list or table
  searchAsset(){
    let term = this.searchTerm.toUpperCase();
    this.myassetList = this.itemsCopy.filter(tag => tag.assetCode.indexOf(term) >=0 || 
                                                    tag.description.indexOf(term) >= 0);
 }

 reassign(updatedlist:AssetsData){
  //this method is updating the employee coding to whom the asset is assigned AGAIN
    this.supersearch.reassignAssetReallocation(updatedlist)
                    .then(res => {const index = this.myrejectedassetlist.indexOf(updatedlist);
                                                this.myrejectedassetlist.splice(index,1)});
 }
}
