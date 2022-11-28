import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Role } from './shared/enums/roles.enum';
import { CurrentUserService } from './shared/services/currentUser.service';
import { RoleService } from './shared/services/role.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {


  subscriptions: Subscription []= [];
  role: Role;
  profileId: string;
  public appPages = [];
  constructor(private roleService: RoleService, private currentUserService: CurrentUserService){}

ngOnInit(): void {

  this.subscriptions.push(this.roleService.role.pipe(skip(1)).subscribe(role => {
    this.role = role;
    if(role === Role.ADMIN){
      this.appPages.push( { title: 'Users', url: '/manage-users', icon: 'person' },
      { title: 'Teams', url: '/manage-teams', icon: 'people' });
    }
  }));

  this.currentUserService.user.pipe(skip(1)).subscribe(userId => {
    this.profileId = userId;
    this.appPages.push({ title: 'Workouts', url: `${this.profileId}/workouts`, icon: 'home' },
                      { title: 'Profile', url: `${this.profileId}/profile`, icon: 'person-circle' },
    );
  });
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub =>sub.unsubscribe());
}

}
