import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageUsersPageRoutingModule } from './manage-users-routing.module';

import { ManageUsersPage } from './manage-users.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageUsersPageRoutingModule,
    SharedModule
  ],
  declarations: [ManageUsersPage]
})
export class ManageUsersPageModule {}
