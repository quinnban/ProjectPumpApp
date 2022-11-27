import { Component, Input, OnInit } from '@angular/core';
import { Workout } from 'src/app/shared/models/workout.model';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss'],
})
export class WorkoutCardComponent implements OnInit {

  @Input() workout: Workout;
  constructor() { }

  ngOnInit() {}

}
