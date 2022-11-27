import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Workout } from '../shared/models/workout.model';
import { WorkoutService } from '../shared/services/workout.service';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
})
export class WorkoutDetailsPage implements OnInit {

  workout: Workout;

  constructor(private route: ActivatedRoute,
              private workoutService: WorkoutService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap(params => this.workoutService.findWorkout(params.id))).subscribe(workout => {
      this.workout = workout;
    });
  }
  userclick(ev: any){
    console.log(ev);
  }

}
