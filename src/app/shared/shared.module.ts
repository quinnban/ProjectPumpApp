import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { AuthService } from './services/auth.service';
import { AwsService } from './services/aws.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CurrentUserService } from './services/currentUser.service';
import { RoleService } from './services/role.service';
import { SelectItemsModalComponent } from './components/select-items-modal/select-items-modal.component';
import { ItemSelectorComponent } from './components/item-selector/item-selector.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    UserService,
    TeamService,
    AuthService
    ,AwsService,
    CurrentUserService,
    RoleService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  declarations: [SelectItemsModalComponent,ItemSelectorComponent],
  exports:[SelectItemsModalComponent,ItemSelectorComponent]
})
export class SharedModule {}
