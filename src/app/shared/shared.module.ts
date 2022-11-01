import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SelectUsersModalComponent } from './componets/select-users-modal/select-users-modal.component';
import { UserServiceService } from './services/user-service.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers:[UserServiceService],
  declarations: [SelectUsersModalComponent],
  exports:[SelectUsersModalComponent]
})
export class SharedModule {}
