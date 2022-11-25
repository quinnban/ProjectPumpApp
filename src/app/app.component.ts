import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from './shared/enums/roles.enum';
import { RoleService } from './shared/services/role.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public appPages = [
    { title: 'Workouts', url: '/workouts', icon: 'home' },
    { title: 'Users', url: '/manage-users', icon: 'person' },
    { title: 'Teams', url: '/manage-teams', icon: 'people' },
    { title: 'Profile', url: '/profile', icon: 'person-circle' },
  ];
  subscription = Subscription.EMPTY;
  role: Role;
  constructor(private roleService: RoleService){}

ngOnInit(): void {
  this.subscription = this.roleService.role.subscribe(role => {
    this.role = role;
  });
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
