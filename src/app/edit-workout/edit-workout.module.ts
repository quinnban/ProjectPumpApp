import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWorkoutPageRoutingModule } from './edit-workout-routing.module';

import { EditWorkoutPage } from './edit-workout.page';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { SetListComponent } from './components/set-list/set-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditWorkoutPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditWorkoutPage,ExerciseListComponent,SetListComponent]
})
export class EditWorkoutPageModule {}
