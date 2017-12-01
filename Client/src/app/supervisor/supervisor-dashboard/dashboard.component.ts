import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../router.animations';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})

export class DashboardComponent implements OnInit {
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
