import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { Workout } from '../shared/models/workout.model';
import { CurrentUserService } from '../shared/services/currentUser.service';
import { RoleService } from '../shared/services/role.service';
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
              private currentUserService: CurrentUserService,
              private roleService: RoleService ) { }

  ngOnInit() {
    this.currentUserService.setUserId();
    this.roleService.setRole();
    this.route.params.pipe(switchMap(params => this.userService.findWorkouts(params.profileId))).subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

}
