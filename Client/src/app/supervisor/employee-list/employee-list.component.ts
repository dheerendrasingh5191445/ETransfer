import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../supervisor.service';
import{ Employee } from '../../model/Employee';
import{ Router } from '@angular/router';
import{ routerTransition}from "./../../router.animations";
import { DatePipe,TitleCasePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
 selector: 'app-employee-list',
 templateUrl: './employee-list.component.html',
 styleUrls: ['./employee-list.component.css'],
 animations:[routerTransition()]
})
export class EmployeeListComponent implements OnInit {
 employees:Employee[];
 itemsCopy:Employee[];
 searchTerm:string;
 noOfitem:string = "10";
 employee:Employee;
 showLoader:boolean = true;
 MyList:string[]=["10","25","50","100"];
 p:any = 1;
 constructor(private supervisorService: SupervisorService,private router:Router,private route:ActivatedRoute) { }

 ngOnInit() {
  //On initilization of this component this method bring the employee list in this component
 const session = sessionStorage.getItem('empid');
 this.supervisorService.getEmployeeListBySupervisorID(session)
                       .subscribe(data => { this.employees = data.json().value;
                                           this.showLoader = false;
                                           this.itemsCopy = this.employees;});
 }

 sendInfo(empID:string){
   //this will navigate to the request generate form
   this.router.navigate(["supervisor","requestgenerate",empID]);    
     
 }
 //function is used for search value from existing list
 search(): void {
    let term = this.searchTerm.toUpperCase();
    this.employees = this.itemsCopy.filter(tag => tag.employeeCode.startsWith(term) || 
                                                  tag.employeeName.toUpperCase().includes(term) );
}
}
