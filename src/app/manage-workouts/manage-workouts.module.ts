import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageWorkoutsPageRoutingModule } from './manage-workouts-routing.module';

import { ManageWorkoutsPage } from './manage-workouts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageWorkoutsPageRoutingModule
  ],
  declarations: [ManageWorkoutsPage]
})
export class ManageWorkoutsPageModule {}
