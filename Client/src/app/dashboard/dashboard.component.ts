import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../router.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  pushRightClass: string = 'push-right';
  session:string;
  constructor() {}

  ngOnInit() {
    this.session = sessionStorage.getItem('role');
  }

 toggleSidebar() {
  const dom: any = document.querySelector('body');
  dom.classList.toggle(this.pushRightClass);
}

}
