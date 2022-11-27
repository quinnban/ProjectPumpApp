import { Component, Input, OnInit } from '@angular/core';
import { ExerciseDetail } from 'src/app/shared/models/exerciseDetail.model';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent implements OnInit {

  @Input() exercise: ExerciseDetail;

  constructor() { }

  ngOnInit() {}

  userclick(ev: any){
    console.log(ev);
  }

}
