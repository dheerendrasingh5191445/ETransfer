import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Params,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-humanresource',
  templateUrl: './humanresource.component.html',
  styleUrls: ['./humanresource.component.scss']
})
export class HumanresourceComponent implements OnInit {

  pushRightClass: string = 'push-right';
  id:string;
  constructor(public router: Router , private route:ActivatedRoute) { }

  ngOnInit() {

    this.router.navigate(['dashboard','humanresource',"roledashboard"]);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
}
