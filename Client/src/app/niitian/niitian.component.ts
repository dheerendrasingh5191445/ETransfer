import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-niitian',
  templateUrl: './niitian.component.html',
  styleUrls: ['./niitian.component.css']
})
export class NiitianComponent implements OnInit {
  public sliders: Array<any> = [];
  
      constructor() {
          //this is used for slider implementation
          this.sliders.push({
              imagePath: 'assets/images/slider1.png',
              label: 'First slide label'
          }, {
              imagePath: 'assets/images/slider2.jpg',
              label: 'Second slide label'
          }, {
              imagePath: 'assets/images/slider3.jpg',
              label: 'Third slide label'
          });
  
        }

  ngOnInit() {
  }

}
