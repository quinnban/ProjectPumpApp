import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTeamPageRoutingModule } from './edit-team-routing.module';

import { EditTeamPage } from './edit-team.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTeamPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [EditTeamPage]
})
export class EditTeamPageModule {}
