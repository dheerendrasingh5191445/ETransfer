import { Component, OnInit  } from '@angular/core';
import { routerTransition } from './../../router.animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AssetControllerDiscrepancyReport } from './../../model/assetDiscrepancyReport';
import { AssetControlService } from '../../asset-control/asset-control.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-asset-discrepancy',
  templateUrl: './asset-discrepancy.component.html',
  styleUrls: ['./asset-discrepancy.component.css'],
  animations: [routerTransition()]
})
export class AssetDiscrepancyComponent implements OnInit {
  p:number = 1;
  report:AssetControllerDiscrepancyReport[]=[];
  errormsg : any;

  constructor(private assetControlService : AssetControlService) { }

  ngOnInit() {
    
    //This method will get all the pending request via calling assetControllerService
    this.assetControlService.getDiscrepancyReport()
    .subscribe(response =>{this.report = response;}
    );
  }
  //This method will export the report to excel format and download it
  exportToExcel(event){
    this.assetControlService.exportAsExcelFile(this.report,'Asset Discrepancy');
  }
}