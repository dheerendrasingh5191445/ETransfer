import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsData} from '../model/asset';
import { AssetControlService } from './asset-control.service';

@Component({
  selector: 'app-asset-control',
  templateUrl: './asset-control.component.html',
  styleUrls: ['./asset-control.component.scss']
})
export class AssetControlComponent implements OnInit {

  pushRightClass: string = 'push-right';
  
  constructor(private assetService:AssetControlService,public router: Router) { }
  List:AssetsData[];

  //List of all assets
  ngOnInit() {
      this.router.navigate(['dashboard/asset-control/roledashboard']);
}

// Toggle-slide fuctionality
toggleSidebar() {
  const dom: any = document.querySelector('body');
  dom.classList.toggle(this.pushRightClass);
}

}


