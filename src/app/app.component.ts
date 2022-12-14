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
  public appPages = [{ title: 'Settings', url: '/manage-users', icon: 'cog' },{ title: 'Logout', url: '/manage-users', icon: 'log-out' }];
  constructor(private roleService: RoleService, private currentUserService: CurrentUserService){}

ngOnInit(): void {

  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  if(prefersDark.matches !== true){
    this.toggleDarkTheme(true);
  }

  this.toggleDarkTheme(prefersDark.matches);

  this.roleService.role.pipe(skip(1)).subscribe(role => {
    this.role = role;
    if(role === Role.ADMIN){
      this.appPages.unshift( { title: 'Manage Users', url: '/manage-users', icon: 'person' },
      { title: 'Manage Teams', url: '/manage-teams', icon: 'people' },
      { title: 'Manage Exercises', url: '/manage-exercises', icon: 'barbell' },
      { title: 'Manage Workouts', url: '/manage-workouts', icon: 'home' });
    }
  });

  this.currentUserService.user.pipe(skip(1)).subscribe(userId => {
    this.profileId = userId;
    this.appPages.unshift({ title: 'Workouts', url: `${this.profileId}/workouts`, icon: 'home' },
                      { title: 'Profile', url: `${this.profileId}/profile`, icon: 'person-circle' },
    );
  });
}

toggleDarkTheme(shouldAdd) {
  document.body.classList.toggle('dark', shouldAdd);
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub =>sub.unsubscribe());
}

}
