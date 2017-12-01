import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {


  id:string;
  constructor(public route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
   this.router.navigate(["dashboard","supervisor","roledashboard"]);
 }
}