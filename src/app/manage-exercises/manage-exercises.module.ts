import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageExercisesPageRoutingModule } from './manage-exercises-routing.module';

import { ManageExercisesPage } from './manage-exercises.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageExercisesPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ManageExercisesPage]
})
export class ManageExercisesPageModule {}
