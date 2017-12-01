import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { DatePipe , TitleCasePipe} from '@angular/common';
import { routerTransition } from './../../router.animations';

import { AssetControlService } from './../asset-control.service';
import { AssetsData} from './../../model/asset';

//Directive to tell the associated html and the css files
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
  animations: [routerTransition()]
})
export class AssetListComponent implements OnInit {
  //declaring instances
  List:AssetsData[]=[];
  showLoader:boolean=true;
  constructor(private assetService:AssetControlService ) {   }
  ngOnInit() { 
    this.assetService.GetAssetList()  // calling the service method to get the list of assets approved
    .then(assetList => { this.List=assetList;this.showLoader=false }) ;
  }

}