import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTeamsPageRoutingModule } from './manage-teams-routing.module';

import { ManageTeamsPage } from './manage-teams.page';
import { SharedModule } from '../shared/shared.module';
import { CreateTeamComponent } from './components/create-team/create-team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTeamsPageRoutingModule,
    SharedModule
  ],
  declarations: [ManageTeamsPage,CreateTeamComponent]
})
export class ManageTeamsPageModule {}
