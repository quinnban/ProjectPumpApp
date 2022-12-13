import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Workout } from '../shared/models/workout.model';
import { CurrentUserService } from '../shared/services/currentUser.service';
import { RoleService } from '../shared/services/role.service';
import { WorkoutService } from '../shared/services/workout.service';

@Component({
  selector: 'app-manage-workouts',
  templateUrl: './manage-workouts.page.html',
  styleUrls: ['./manage-workouts.page.scss'],
})
export class ManageWorkoutsPage implements OnInit {

  workouts: Workout [];

  constructor(public menuCtrl: MenuController,
              private currentUserService: CurrentUserService,
              private roleService: RoleService,
              private workoutService: WorkoutService,
              private alertController: AlertController,
              private router: Router,
              private loadingController: LoadingController){ }

  ngOnInit() {
    this.currentUserService.setUserId();
    this.roleService.setRole();
    this.workoutService.findAllWorkouts().subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

   async createWorkoutAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Create a workout',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (value) => {
            this.createWorkout(value[0]);
            //do http return false is error
            return false;
          },
      },
      {
        role:'cancel',
        text:'cancel'
      }
    ],
      inputs: [
        {
          placeholder: 'Workout name',
          type:'text'
        },
      ],
    });
    await alert.present();
  }


  private async createWorkout(name: string){
    const screen = await this.loadingController.create();
    screen.present();
    const newWorkout = new Workout();
    newWorkout.name = name;
    this.workoutService.createWorkout(newWorkout).subscribe(workout =>{
        this.workouts.push(workout);
        this.loadingController.dismiss();
        this.alertController.dismiss();
        this.router.navigate(['edit-workout',workout.id,]);
      },err => {
      this.loadingController.dismiss();
      console.log(err);
      return false;
    });
  }

}
