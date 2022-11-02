import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
})
export class WorkoutDetailsPage implements OnInit {

  exercises = Array(6).fill(0).map((x,i)=>i);

  constructor() { }

  ngOnInit() {
  }

}
