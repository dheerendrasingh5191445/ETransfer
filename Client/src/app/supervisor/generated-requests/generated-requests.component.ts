import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../supervisor.service';
import{ Employee } from '../../model/Employee';
import{ Request } from '../../model/Request';
import{ Router } from '@angular/router';
import{ routerTransition }from "./../../router.animations";
import { DatePipe,TitleCasePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-generated-requests',
  templateUrl: './generated-requests.component.html',
  styleUrls: ['./generated-requests.component.css'],
  animations:[routerTransition()]
})
export class GeneratedRequestsComponent implements OnInit {
  requests:Request[];
  itemsCopy:Request[];
  searchTerm:string;
  noOfitem:string = "10";
  MyList:string[]=["10","25","50","100"];
  constructor(private supervisorService: SupervisorService,private router:Router,private route:ActivatedRoute) { }
 
  ngOnInit() {
    //On initilization of this component this method bring the employee list in this component
    const session = sessionStorage.getItem('empid'); 
    this.supervisorService.getAllgeneratesrequest(session)
                          .then(data => { this.requests = data.json().value;
                                          this.itemsCopy = this.requests;});
  }

  //function is used for search value from existing list
  search(): void {
     let term = this.searchTerm.toUpperCase();
     this.requests = this.itemsCopy.filter(tag => tag.employeeCode.indexOf(term) >=0);
 }
 }
 