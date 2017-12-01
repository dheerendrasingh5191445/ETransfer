import { Component, OnInit} from '@angular/core';
import { GlobalUserService} from '../global-userview/globaluser.service';
import { DatePipe , TitleCasePipe} from '@angular/common';
import { AssetsData } from '../../../model/asset';
import { ActivatedRoute} from '@angular/router';
import { routerTransition}from "./../../../router.animations";

@Component({                   //Component Directive that tells the controller about what files to pick up 
  selector: 'app-accepted-history',
  templateUrl: './accepted-history.component.html',   //Html file information
  styleUrls: ['./accepted-history.component.scss'],   //css file information
  animations:[routerTransition()]
})

export class AcceptedUserHistory implements OnInit{              //class BEGINS
  myPendingAssetRequest:AssetsData[]=[];             /* Variables being declared of whole class*/
  itemsCopy:AssetsData[];                               
  searchTerm:string;                                      
  noOfitem:string = "10";
  MyList:string[]=["10","25","50","100"];
  
	constructor(private globalService:GlobalUserService,private router:ActivatedRoute) { }   //constructor of the class

	ngOnInit(){
    
    //On loading of component,this method will automatically run which gets all the accepted requested requests from the service.
    const session = sessionStorage.getItem('empid');
    this.globalService.getMyAcceptedRequest(session).subscribe(data => { this.itemsCopy = data ,console.log(data);
                                                                   this.myPendingAssetRequest = data});
	}                   //ngOnInit ENDS

 //for searching in table
  search(): void {
    let term = this.searchTerm.toUpperCase();
    this.myPendingAssetRequest= this.itemsCopy.filter(tag => tag.assetCode.indexOf(term) >=0 || 
                                                             tag.description.indexOf(term) >= 0);
  }
}         //class ENDS