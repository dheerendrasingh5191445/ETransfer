import { Component, OnInit } from '@angular/core';
import { GlobalUserService } from "./globaluser.service";
import { AssetsData } from '../../../model/asset';
import{ routerTransition }from "./../../../router.animations";
import { ActivatedRoute } from '@angular/router';
import {DatePipe , TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-global-userview',
  templateUrl: './global-userview.component.html',
  styleUrls: ['./global-userview.component.scss','./global-userview.component.css'],
  animations:[routerTransition()]
})

export class GlobalUserviewComponent implements OnInit {
  myPendingAssetRequest:AssetsData[]=[];
  itemsCopy:AssetsData[];
  searchTerm:string;
  noOfitem:string = "10";
  MyList:string[]=["10","25","50","100"];
  constructor(private globalUser : GlobalUserService,private router : ActivatedRoute) { }

  //On loading of component,this method will automatically run which gets all the pending requests from the service.
  ngOnInit() { 
        const session = sessionStorage.getItem('empid');
        this.globalUser.getMyPendingRequest(session).subscribe(data => { this.itemsCopy = data
                                                this.myPendingAssetRequest = data});
  }


   //function is used for search value from existing list
  search(): void {
  let term = this.searchTerm.toUpperCase();
  this.myPendingAssetRequest= this.itemsCopy.filter(tag => tag.assetCode.indexOf(term) >=0 || 
                                                    tag.description.indexOf(term) >= 0);
}

  //here this method will get asset id and asset data from html form, for updating the asset status in database and removing the row from html page.
  accept(data) {
    let id = data.assetId;
    data.assetStatus = 1;

    this.globalUser.approve(id,data).then(resp => {
                                                    const index= this.myPendingAssetRequest.indexOf(data);
                                                     this.myPendingAssetRequest.splice(index,1);
                                                  })      
  }

  //here this method will get asset id and asset data from html form, for updating the asset status in database and removing the row from html page.
  reject(data) {
    let id = data.assetId;
    data.assetStatus = 2;

      this.globalUser.reject(id,data).then(resp => {
                                        const index= this.myPendingAssetRequest.indexOf(data);
                                        this.myPendingAssetRequest.splice(index,1);
    })
  }
}
