import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../shared/services/exercise.service';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.page.html',
  styleUrls: ['./edit-exercise.page.scss'],
})
export class EditExercisePage implements OnInit {

  exerciseForm: FormGroup;

  constructor(private exerciseService: ExerciseService,private fb: FormBuilder) { }

  ngOnInit() {
    this.exerciseForm = this.createForm();
  }

  submit(){
    this.exerciseService.updateExercise(this.exerciseForm.value).subscribe(exercise => {
      this.exerciseForm.patchValue(exercise);
    });
  }


  private createForm(){
    return this.fb.group({
      name:'',
      category:'',
      description:''
    });
  }

}
