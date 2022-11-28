import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { SelectUsersModalComponent } from './componets/select-users-modal/select-users-modal.component';
import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { AuthService } from './services/auth.service';
import { AwsService } from './services/aws.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CurrentUserService } from './services/currentUser.service';
import { RoleService } from './services/role.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
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
  declarations: [SelectUsersModalComponent],
  exports:[SelectUsersModalComponent]
})
export class SharedModule {}
