import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { SelectUsersModalComponent } from './componets/select-users-modal/select-users-modal.component';
import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { AuthService } from './services/auth.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
  ],
  providers:[UserService,TeamService,AuthService],
  declarations: [SelectUsersModalComponent],
  exports:[SelectUsersModalComponent]
})
export class SharedModule {}
