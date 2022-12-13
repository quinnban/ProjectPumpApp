import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SetListComponent ),
      multi: true
    },
  ],
})
export class SetListComponent implements OnInit, OnDestroy, ControlValueAccessor {
  repsArray: FormArray;
  repsForm: FormGroup;
  subscription: Subscription [] = [];
  private onTouched: () => {};

  constructor(private formBuilder: FormBuilder) { }

  registerOnChange(fn: any): void {
    this.subscription.push(this.repsArray.valueChanges.subscribe(val => fn(val)));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if(!!value && value.length !==0){
      value.forEach(item => {
        if(this.repsArray.length < value.length){
          this.addSet();
        }
      });
      this.repsArray.patchValue(value);
    } else {
      setTimeout(()=> this.repsArray.reset(),0);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  addSet(){
    this.repsArray.push(new FormControl());
  }


  ngOnInit() {
    this.repsArray = this.createArray();
    this.repsForm = this.createExercisesForm();
  }

  private createArray(): FormArray{
    return this.formBuilder.array([]);
  }

  private createExercisesForm(): FormGroup {
    return this.formBuilder.group({
      reps: this.repsArray
    });
  }

}
