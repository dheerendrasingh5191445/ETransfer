import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cso-control',
  templateUrl: './cso-control.component.html',
  styleUrls: ['./cso-control.component.scss']
})
export class CsoControlComponent implements OnInit {

  pushRightClass: string = 'push-right';

  constructor(public router: Router) { }

  ngOnInit() {
 
      this.router.navigate(['dashboard','cso-control','roledashboard']);
}
toggleSidebar() {
  const dom: any = document.querySelector('body');
  dom.classList.toggle(this.pushRightClass);
}
}