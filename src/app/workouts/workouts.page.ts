import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {

  workouts = Array(10).fill(0).map((x,i)=>i);


  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

}
