import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Workout } from '../shared/models/workout.model';
import { WorkoutService } from '../shared/services/workout.service';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.page.html',
  styleUrls: ['./edit-workout.page.scss'],
})
export class EditWorkoutPage implements OnInit {

  workoutForm: FormGroup;
  workout: Workout;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              protected workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutForm = this.buildForm();
    this.route.params.pipe(switchMap(params =>  this.workoutService.findWorkout(params.id))).subscribe(workout => {
      this.workout = workout;
      this.patchForm(workout);
  });
  }

  updateWorkout(){
    this.workoutService.updateWorkout(this.workoutForm.value).subscribe(result => {
      this.patchForm(result);
    });
    console.log(this.workoutForm.value);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id:'',
      name: '',
      url: '',
      description:'',
      exercises: [],
    });
  }

  private patchForm(workout: Workout): void {
    this.workoutForm.patchValue({
      id: workout.id,
      name: workout.name,
      description: workout.description,
      exercises: workout.exercises.map(e => ({id:e.id, exerciseId:e.exercise.id,name: e.exercise.name, reps: e.reps}))
    });
  }



}
