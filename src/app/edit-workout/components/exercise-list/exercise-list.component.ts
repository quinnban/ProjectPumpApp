import { Component, forwardRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GestureController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItemSelectorComponent } from 'src/app/shared/components/item-selector/item-selector.component';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { AddExerciseModalComponent } from '../add-exercise-modal/add-exercise-modal.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExerciseListComponent ),
      multi: true
    },
  ],
})
export class ExerciseListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  exercises: Exercise [];
  selectedExerciseDetailsArray: FormArray;
  selectedExerciseDetailsForm: FormGroup;
  subscription: Subscription [] = [];
  private onTouched: () => {};

  constructor(private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              private exerciseService: ExerciseService,
              private gestureCtrl: GestureController) { }

  @HostListener('blur')
  handleBlur(){
    if(this.onTouched){
      this.onTouched();
    }
  }

  registerOnChange(fn: any): void {
    this.subscription.push(this.selectedExerciseDetailsArray.valueChanges.subscribe(val => fn(val)));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if(!!value && value.length !==0){
      value.forEach(item => {
        if(this.selectedExerciseDetailsArray.length < value.length){
          this.addExercise();
        }
      });
      this.selectedExerciseDetailsArray.patchValue(value);
    } else {
      setTimeout(()=> this.selectedExerciseDetailsArray.reset(),0);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.selectedExerciseDetailsArray = this.createArray();
    this.selectedExerciseDetailsForm = this.createExercisesForm();
    this.exerciseService.findAllExercises().subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  removeAtIndex(index: number){
    this.selectedExerciseDetailsArray.removeAt(index);
  }

  async openAddExerciseModal(){
    const modal = await this.modalCtrl.create({
      component: AddExerciseModalComponent,
      componentProps: {
        exercises: this.exercises
      },
      breakpoints: [0,0.5,1],
      initialBreakpoint: 0.50
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if(role === 'confirm'){
      this.addExercise();
      this.selectedExerciseDetailsArray.at(this.selectedExerciseDetailsArray.length-1).patchValue({exerciseId:data.id,name:data.name});
      console.log(data, role);
    }
  }

  private addExercise(): void {
    this.selectedExerciseDetailsArray.push(this.createExerciseDetail());
  }

  private createArray(): FormArray{
    return this.formBuilder.array([]);
  }

  private createExercisesForm(): FormGroup {
    return this.formBuilder.group({
      exercises: this.selectedExerciseDetailsArray
    });
  }

  private createExerciseDetail(): FormGroup{
    return  this.formBuilder.group({
      id:[null],
      exerciseId: [null],
      name: [null],
      reps:[],
    });
  }
}
