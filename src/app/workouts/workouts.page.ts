import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { Workout } from '../shared/models/workout.model';
import { CurrentUserService } from '../shared/services/currentUser.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {

  workouts: Workout [] = [];


  constructor(public menuCtrl: MenuController,
              private route: ActivatedRoute,
              private userService: UserService,
              private currentUserService: CurrentUserService ) { }

  ngOnInit() {
    this.currentUserService.setUserId();
    this.route.params.pipe(switchMap(params => this.userService.findWorkouts(params.profileId))).subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

}
