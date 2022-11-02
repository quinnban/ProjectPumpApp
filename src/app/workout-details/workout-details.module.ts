import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutDetailsPageRoutingModule } from './workout-details-routing.module';

import { WorkoutDetailsPage } from './workout-details.page';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutDetailsPageRoutingModule
  ],
  declarations: [WorkoutDetailsPage,ExerciseCardComponent]
})
export class WorkoutDetailsPageModule {}
